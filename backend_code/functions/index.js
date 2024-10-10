const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();
const db = admin.firestore();

exports.setCustomUserClaims = functions.region("australia-southeast1")
    .https.onCall((data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError("permission-denied",
            "Only authenticated users can set custom claims!");
      }

      if (data.adminCode !== "ADMIN") {
        throw new functions.https.HttpsError("permission-denied",
            `Invalid ADMINCODE provided!\n
        Automatically registers you as a regular user.`);
      }


      const userId = data.userId;


      const role = "admin";


      return admin.auth().setCustomUserClaims(userId, {role: role})
          .then(() => {
            return {message: `Sign up as Admin successfully!`};
          })
          .catch((error) => {
            throw new functions.https.HttpsError("unknown",
                error.message, error);
          });
    });

exports.scheduleAppointment = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
    // Check if the user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The user is not authenticated.",
        );
      }

      const {uid, userEmail, appointmentDate, appointmentTime} = data;

      // Validate input data
      if (!appointmentDate || !appointmentTime) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Invalid appointment date or time.",
        );
      }

      // Save appointment to Firestore
      try {
        await db.collection("appointments").add({
          uid,
          userEmail,
          appointmentDate,
          appointmentTime,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return {success: true};
      } catch (error) {
        console.error("Error scheduling appointment:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to schedule appointment.",
        );
      }
    });

exports.getAppointments = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
      // Check if the user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The user is not authenticated.",
        );
      }

      const uid = context.auth.uid;

      try {
        // Get user record to check custom claims
        const userRecord = await admin.auth().getUser(uid);
        const customClaims = userRecord.customClaims || {};

        let appointmentsQuery;

        if (customClaims.role === "admin") {
          // If user is an admin, fetch all appointments
          appointmentsQuery = db.collection("appointments");
        } else {
          // If user is a regular user, fetch only their appointments
          appointmentsQuery = db
              .collection("appointments")
              .where("uid", "==", uid);
        }

        const appointmentsSnapshot = await appointmentsQuery.get();

        const appointments = [];
        appointmentsSnapshot.forEach((doc) => {
          appointments.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        return {appointments};
      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to fetch appointments.",
        );
      }
    });

exports.deleteAppointment = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
      // Check if the user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "The user is not authenticated.",
        );
      }

      const {appointmentId} = data;
      const uid = context.auth.uid;

      // Validate input data
      if (!appointmentId) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "No appointment ID provided.",
        );
      }

      try {
        // Retrieve appointment document reference
        const appointmentRef = db.collection("appointments").doc(appointmentId);
        const appointmentDoc = await appointmentRef.get();

        if (!appointmentDoc.exists) {
          throw new functions.https.HttpsError(
              "not-found",
              "Appointment not found.",
          );
        }

        const appointmentData = appointmentDoc.data();

        // Authorization check:
        // only allow the user who created the appointment to delete it
        if (appointmentData.uid !== uid) {
          throw new functions.https.HttpsError(
              "permission-denied",
              "You do not have permission to delete this appointment.",
          );
        }

        // Delete the appointment
        await appointmentRef.delete();

        return {success: true};
      } catch (error) {
        console.error("Error deleting appointment:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to delete appointment.",
        );
      }
    });

const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY =
    "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";
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendAppointmentNotification = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
    // Verify the user is authenticated
      if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated",
            "User must be authenticated.");
      }

      // Verify the user is an admin
      const uid = context.auth.uid;
      const userRecord = await admin.auth().getUser(uid);
      const customClaims = userRecord.customClaims || {};
      if (customClaims.role !== "admin") {
        throw new functions.https.HttpsError("permission-denied",
            "User does not have permission to send emails.");
      }

      const appointment = data.appointment;
      if (!appointment) {
        throw new functions.https.HttpsError("invalid-argument",
            "Appointment data is required.");
      }

      const msg = {
        to: appointment.userEmail,
        from: "yihanshang0@gmail.com",
        subject: "Appointment Confirmation",
        text: `Hello,

This is to inform you that your appointment scheduled at 
${appointment.createdAt} has been successfully booked.
 The appointment date and time are ${appointment.appointmentDate}
  at ${appointment.appointmentTime}.

Thank you,
Your Company`,
        html: `<p>Hello,</p>
<p>This is to inform you that your appointment scheduled at 
<strong>${appointment.createdAt}</strong> 
has been successfully booked. The appointment date and time are
 <strong>${appointment.appointmentDate}</strong> 
at <strong>${appointment.appointmentTime}</strong>.</p>
<p>Thank you,<br/>Immigration Center</p>`,
      };

      try {
        await sgMail.send(msg);
        return {success: true};
      } catch (error) {
        console.error("Error sending email:", error);
        throw new functions.https.HttpsError("internal",
            "Failed to send email.");
      }
    });


exports.callAI = functions
    .region("australia-southeast1")
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "User must be authenticated to use this function.",
        );
      }

      const model = "@cf/meta/llama-3-8b-instruct";
      const input = data.input;

      try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/1e446522e62f496f6dc6d89b7b751d9a/ai/run/${model}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization":
                "Bearer cr6S7ac1PJ_HuaNGDmPJg-9VoGVvo_6wMRZVL65e",
              },
              body: JSON.stringify(input),
            },
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("AI API response:", result);
        return {result};
      } catch (error) {
        console.error("Error calling AI API:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Failed to call AI API.",
            error.message,
        );
      }
    });
