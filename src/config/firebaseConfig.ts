import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// You'll n eed to replace this with your actual service account file name
import serviceAccount from "../../module3demo2026-firebase-adminsdk-fbsvc-49a43b94e2.json";

// initialize the Firebase app with our service account key
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// get a reference to the firestore database
const db: Firestore = getFirestore();

const auth: Auth = getAuth();

export { auth, db };
