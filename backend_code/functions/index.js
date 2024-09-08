const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


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
