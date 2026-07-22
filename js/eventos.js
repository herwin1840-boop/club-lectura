// Lógica del calendario y del próximo encuentro (videollamada).
import { db } from "./firebase-config.js";
import {
  collection, doc, addDoc, deleteDoc, setDoc,
  query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COL_EVENTOS = collection(db, "eventos");
const REF_ENCUENTRO = doc(db, "config", "proximo_encuentro");

/** Escucha en tiempo real la lista de eventos del calendario. */
export function observarEventos(callback) {
  const q = query(COL_EVENTOS, orderBy("orden", "asc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

/** Crea un evento del calendario (fecha en texto libre, ej. "24 jul", + descripción). */
export async function crearEvento({ fecha, texto, orden }) {
  await addDoc(COL_EVENTOS, { fecha, texto, orden: orden ?? Date.now() });
}

export async function eliminarEvento(id) {
  await deleteDoc(doc(db, "eventos", id));
}

/** Escucha en tiempo real los datos del próximo encuentro (fecha + nombre de sala Jitsi). */
export function observarProximoEncuentro(callback) {
  return onSnapshot(REF_ENCUENTRO, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
}

/** Guarda/actualiza el próximo encuentro. sala es el nombre de la sala de Jitsi Meet. */
export async function guardarProximoEncuentro({ fecha, sala }) {
  await setDoc(REF_ENCUENTRO, { fecha, sala });
}
