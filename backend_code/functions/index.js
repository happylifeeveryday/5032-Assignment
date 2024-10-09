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
