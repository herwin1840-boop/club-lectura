// Textos fijos de la página de inicio, editables desde el panel.
import { db } from "./firebase-config.js";
import { doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const REF = doc(db, "config", "textos");

export const TEXTOS_POR_DEFECTO = {
  hero_titulo: "Se lee de a un libro.\nSe conversa desde muchas partes.",
  hero_subtitulo: "Cada mes alguien del club elige qué leemos. Cada semana nos encontramos —en el margen del texto, o en videollamada— para no leer solos aunque estemos lejos.",
  como1_titulo: "Alguien elige",
  como1_texto: "Cada mes le toca el turno a un lector distinto. Elige el libro, escribe por qué lo eligió, y ese porqué queda anotado junto a la portada.",
  como2_titulo: "Se comenta en el margen",
  como2_texto: "Cada capítulo tiene su propio hilo. Escribes cuando puedes —de madrugada, entre clases, un domingo— y tu nota queda ahí, como en un libro prestado.",
  como3_titulo: "Nos vemos igual",
  como3_texto: "Cada una o dos semanas, videollamada dentro del sitio. No hace falta salir a otra app: se entra y ya estamos todos ahí.",
  cta_titulo: "No importa desde dónde leas.",
  cta_texto: "Suaita, Bucaramanga, o al otro lado del país — el club se sostiene en el margen que todos escribimos juntos.",
};

export function observarTextos(callback) {
  return onSnapshot(REF, (snap) => callback(snap.exists() ? snap.data() : null));
}

export async function guardarTextos(datos) {
  await setDoc(REF, datos, { merge: true });
}
