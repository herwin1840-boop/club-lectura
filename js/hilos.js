// Lógica de hilos de discusión: leer mensajes en tiempo real y publicar nuevos
import { db, auth } from "./firebase-config.js";
import {
  collection, doc, addDoc, deleteDoc, query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * Escucha en tiempo real los mensajes de un hilo (hilo general o de un capítulo).
 * callback recibe un arreglo de mensajes ordenados por fecha.
 */
export function observarMensajes(hiloId, callback) {
  const ref = collection(db, "hilos", hiloId, "mensajes");
  const q = query(ref, orderBy("fecha", "asc"));
  return onSnapshot(q, (snap) => {
    const mensajes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(mensajes);
  });
}

/**
 * Publica un mensaje nuevo en un hilo. Requiere sesión iniciada.
 * autorNombre se guarda junto al mensaje para no tener que consultar
 * el perfil de cada autor al mostrar el hilo.
 */
export async function publicarMensaje(hiloId, contenido, autorNombre) {
  if (!auth.currentUser) throw new Error("Debes iniciar sesión para comentar.");
  const ref = collection(db, "hilos", hiloId, "mensajes");
  await addDoc(ref, {
    autor_id: auth.currentUser.uid,
    autor_nombre: autorNombre || "Lector",
    contenido,
    fecha: serverTimestamp(),
  });
}

/**
 * Borra un mensaje. Las reglas de Firestore ya exigen que quien llame
 * esto sea el autor del mensaje o un moderador/admin.
 */
export async function borrarMensaje(hiloId, mensajeId) {
  await deleteDoc(doc(db, "hilos", hiloId, "mensajes", mensajeId));
}
