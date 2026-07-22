// Lógica de apariencia: paleta de color y tipografía del sitio.
import { db } from "./firebase-config.js";
import { doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const REF = doc(db, "config", "apariencia");

// Paletas curadas (papel, tinta, acento, verde) — todas probadas para
// que el contraste y la legibilidad se mantengan.
export const PALETAS = {
  margen: { nombre: "Margen (original)", paper: "#F1ECE0", ink: "#21242B", pencil: "#AE3F28", moss: "#3F5945" },
  tinta_azul: { nombre: "Tinta azul", paper: "#EFF1EC", ink: "#1F2A33", pencil: "#2C5C8A", moss: "#4A6A52" },
  noche: { nombre: "Biblioteca de noche", paper: "#E9E4D8", ink: "#1B1B1B", pencil: "#8C3B2E", moss: "#5C6E4A" },
  jardin: { nombre: "Jardín", paper: "#F2EFE4", ink: "#26302A", pencil: "#B15A2B", moss: "#3E6B4F" },
};

// Combinaciones de fuentes curadas (Google Fonts, ya cargadas en cada página).
export const FUENTES = {
  fraunces: { nombre: "Fraunces + Work Sans (original)", display: "'Fraunces', serif", body: "'Work Sans', sans-serif" },
  playfair: { nombre: "Playfair Display + Source Sans", display: "'Playfair Display', serif", body: "'Source Sans 3', sans-serif" },
  merriweather: { nombre: "Merriweather + Nunito Sans", display: "'Merriweather', serif", body: "'Nunito Sans', sans-serif" },
};

export function observarApariencia(callback) {
  return onSnapshot(REF, (snap) => callback(snap.exists() ? snap.data() : null));
}

export async function guardarApariencia({ paletaId, fuenteId }) {
  await setDoc(REF, { paletaId, fuenteId });
}
