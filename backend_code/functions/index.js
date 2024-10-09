const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
