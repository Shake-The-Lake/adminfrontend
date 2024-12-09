// Src/config/firebaseConfig.ts
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

type FirebaseConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId?: string; // Optional property
};

const firebaseConfig: FirebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
	appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);
let auth: ReturnType<typeof getAuth>;
auth = getAuth(app);

export {auth};