// Aplica la apariencia guardada (colores + tipografía) a la página actual.
// Se importa en cada página del sitio para que el tema sea consistente.
import { db } from "./firebase-config.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { PALETAS, FUENTES } from "./apariencia.js";

const GOOGLE_FONTS_URL = {
  playfair: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Source+Sans+3:wght@400;500;600&display=swap",
  merriweather: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Nunito+Sans:wght@400;600;700&display=swap",
};

function inyectarFuenteSiHaceFalta(fuenteId) {
  if (fuenteId === "fraunces" || !GOOGLE_FONTS_URL[fuenteId]) return;
  if (document.querySelector(`link[data-fuente="${fuenteId}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = GOOGLE_FONTS_URL[fuenteId];
  link.dataset.fuente = fuenteId;
  document.head.appendChild(link);
}

onSnapshot(doc(db, "config", "apariencia"), (snap) => {
  if (!snap.exists()) return;
  const { paletaId, fuenteId } = snap.data();
  const paleta = PALETAS[paletaId];
  const fuente = FUENTES[fuenteId];
  const root = document.documentElement.style;

  if (paleta) {
    root.setProperty("--paper", paleta.paper);
    root.setProperty("--ink", paleta.ink);
    root.setProperty("--pencil", paleta.pencil);
    root.setProperty("--moss", paleta.moss);
  }
  if (fuente) {
    inyectarFuenteSiHaceFalta(fuenteId);
    root.setProperty("--display", fuente.display);
    root.setProperty("--body", fuente.body);
  }
});
