const liste = document.getElementById("liste");
const input = document.getElementById("message");

// Charger les messages sauvegardés
const messages = JSON.parse(localStorage.getItem("messages")) || [];
messages.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  liste.appendChild(li);
});

function envoyer() {
  const texte = input.value;
  if (texte === "") return;

  const li = document.createElement("li");
  li.textContent = texte;
  liste.appendChild(li);

  messages.push(texte);
  localStorage.setItem("messages", JSON.stringify(messages));

  input.value = "";
}