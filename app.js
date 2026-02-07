const contacts = ["Alice", "Bob", "Clara"];
let currentContact = null;

const conversations = {
  Alice: [],
  Bob: [],
  Clara: []
};

const contactList = document.getElementById("contact-list");
const messagesEl = document.getElementById("messages");
const chatTitle = document.getElementById("chat-title");

// Génération des contacts
contacts.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  li.onclick = () => selectContact(name, li);
  contactList.appendChild(li);
});

function selectContact(name, element) {
  currentContact = name;
  chatTitle.textContent = name;

  document.querySelectorAll("#contact-list li")
    .forEach(li => li.classList.remove("active"));

  element.classList.add("active");
  renderMessages();
}

function renderMessages() {
  messagesEl.innerHTML = "";
  conversations[currentContact].forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg.text;
    li.className = msg.from;
    messagesEl.appendChild(li);
  });
}

function envoyer() {
  if (!currentContact) {
    alert("Choisis un contact");
    return;
  }

  const input = document.getElementById("message");
  if (input.value.trim() === "") return;

  conversations[currentContact].push({
    text: input.value,
    from: "me"
  });

  input.value = "";
  renderMessages();
}