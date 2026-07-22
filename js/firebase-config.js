// Configuración real del proyecto "Club-Lectura" en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3YY8_hgf-iD2Fkc7vd3G4Yvg2WUqzXtc",
  authDomain: "club-lectura-64e96.firebaseapp.com",
  projectId: "club-lectura-64e96",
  storageBucket: "club-lectura-64e96.firebasestorage.app",
  messagingSenderId: "223423310822",
  appId: "1:223423310822:web:24cde129fc86fa72be0427"
};

// Inicializa Firebase (usa el SDK modular vía CDN, ver index.html)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
