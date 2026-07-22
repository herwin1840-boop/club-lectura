// Lógica del archivo de libros: crear, listar, editar, y marcar cuál es "el actual".
import { db } from "./firebase-config.js";
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const COL = collection(db, "libros");

/** Escucha en tiempo real TODOS los libros (para el panel de admin). */
export function observarLibros(callback) {
  const q = query(COL, orderBy("creado", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

/** Escucha en tiempo real SOLO el libro marcado como actual (para la portada pública). */
export function observarLibroActual(callback) {
  const q = query(COL, where("estado", "==", "actual"));
  return onSnapshot(q, (snap) => {
    callback(snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() });
  });
}

/** Crea un libro nuevo. Por defecto queda "en archivo" hasta que se marque como actual. */
export async function crearLibro(datos) {
  const ref = await addDoc(COL, {
    ...datos,
    estado: "archivado",
    creado: serverTimestamp(),
  });
  return ref.id;
}

export async function actualizarLibro(id, datos) {
  await updateDoc(doc(db, "libros", id), datos);
}

export async function eliminarLibro(id) {
  await deleteDoc(doc(db, "libros", id));
}

/** Marca un libro como el actual, y desmarca cualquier otro que lo tuviera. */
export async function marcarComoActual(id) {
  const q = query(COL, where("estado", "==", "actual"));
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map(d =>
    d.id === id ? null : updateDoc(doc(db, "libros", d.id), { estado: "archivado" })
  ));
  await updateDoc(doc(db, "libros", id), { estado: "actual" });
}
