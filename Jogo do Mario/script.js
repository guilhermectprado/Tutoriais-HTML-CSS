const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const buttonRetry = document.querySelector(".btn-game-over");

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") jump();
});

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = parseInt(window.getComputedStyle(mario).bottom);

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition + 20}px`;

    mario.src = "game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    buttonRetry.style.visibility = "visible";

    clearInterval(loop);
  }
}, 10);

buttonRetry.addEventListener("click", () => {
  location.reload();
});
