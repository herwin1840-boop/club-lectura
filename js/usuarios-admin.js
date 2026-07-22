// Lógica de gestión de miembros: listar y cambiar roles.
import { db } from "./firebase-config.js";
import {
  collection, doc, updateDoc, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COL = collection(db, "usuarios");

/** Escucha en tiempo real todos los miembros del club. */
export function observarUsuarios(callback) {
  const q = query(COL, orderBy("nombre", "asc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

/** Cambia el rol de un miembro: "miembro" | "moderador" | "admin". */
export async function cambiarRol(uid, nuevoRol) {
  await updateDoc(doc(db, "usuarios", uid), { rol: nuevoRol });
}
