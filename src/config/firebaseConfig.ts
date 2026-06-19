import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// You'll n eed to replace this with your actual service account file name
import serviceAccount from "../../loan-14cfd-firebase-adminsdk-fbsvc-991b701454.json";

// initialize the Firebase app with our service account key
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// get a reference to the firestore database
const db: Firestore = getFirestore();

const auth: Auth = getAuth();

console.log("PROJECT ID:", serviceAccount.project_id);
export { auth, db };
