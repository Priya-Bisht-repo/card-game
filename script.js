const cards = ["🐶", "🐱", "🐼", "🦊", "🐶", "🐱", "🐼", "🦊"];
let flipped = [];
let matchedPairs = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  shuffle(cards);

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flipped.length >= 2 || this.classList.contains("flipped") || this.classList.contains("matched")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.emoji;
  flipped.push(this);

  if (flipped.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flipped;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    if (matchedPairs === cards.length / 2) {
      document.getElementById("status").innerText = "🎉 You Won!";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
    }, 800);
  }

  flipped = [];
}

createBoard();
