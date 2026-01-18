import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "../firebase.js";

const foro = document.getElementById("foro");
const enviar = document.getElementById("enviar");
const mensaje = document.getElementById("mensaje");

async function cargar() {
  const snap = await getDocs(collection(db, "sugerencias"));
  foro.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();
    foro.innerHTML += `
      <div class="post">
        <strong>${d.autor}</strong>
        ${d.admin ? '<span class="admin-badge">ADMIN</span>' : ''}
        <p>${d.texto}</p>
      </div>
    `;
  });
}

enviar.onclick = async () => {
  if (!auth.currentUser) {
    alert("Inicia sesión primero");
    return;
  }

  await addDoc(collection(db, "sugerencias"), {
    autor: auth.currentUser.displayName,
    texto: mensaje.value,
    admin: false,
    fecha: serverTimestamp()
  });

  mensaje.value = "";
  cargar();
};

cargar();
