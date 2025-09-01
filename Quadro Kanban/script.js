const columns = document.querySelectorAll(".cards");
const cards = document.querySelectorAll(".card");

let draggedCard;

const dragStart = (event) => {
  draggedCard = event.target;
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragEnter = ({ target }) => {
  if (target.classList.contains("cards")) {
    target.classList.add("highlight");
  }
};

const dragLeave = ({ target }) => {
  if (target.classList.contains("cards")) {
    target.classList.remove("highlight");
  }
};

const drop = ({ target }) => {
  if (target.classList.contains("cards")) {
    // Se remover isso, da pra adicionar de forma aninhada
    target.classList.remove("highlight");
    target.append(draggedCard);
  }
};

const createCard = ({ target }) => {
  if (!target.classList.contains("cards")) return; // Se remover isso, da pra adicionar de forma aninhada

  const card = document.createElement("section");

  card.className = "card";
  card.draggable = true;

  card.contentEditable = true;

  card.addEventListener("focusout", () => {
    card.contentEditable = false;

    if (!card.textContent.trim()) {
      card.remove();
    }
  });

  card.addEventListener("dragstart", dragStart);

  target.append(card);
  card.focus();
};

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
  column.addEventListener("dblclick", createCard);
});
