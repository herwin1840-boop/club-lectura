// Lógica de la cola de turnos de curadores: quién elige el próximo libro.
import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const REF = doc(db, "config", "cola_curadores");

/** Escucha en tiempo real la cola (arreglo de UIDs, en orden de turno). */
export function observarColaIds(callback) {
  return onSnapshot(REF, (snap) => {
    callback(snap.exists() ? (snap.data().orden || []) : []);
  });
}

/**
 * Mueve al primero de la cola hacia el final (su turno ya se cumplió).
 */
export async function avanzarTurno() {
  const snap = await getDoc(REF);
  const orden = snap.exists() ? (snap.data().orden || []) : [];
  if (orden.length === 0) return;
  const [primero, ...resto] = orden;
  await setDoc(REF, { orden: [...resto, primero] });
}

/** Quita a alguien de la cola por completo (ej. si dejó el club). */
export async function quitarDeCola(uid) {
  const snap = await getDoc(REF);
  const orden = snap.exists() ? (snap.data().orden || []) : [];
  await setDoc(REF, { orden: orden.filter(id => id !== uid) });
}
