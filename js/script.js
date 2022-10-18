const body = document.querySelector("body")
const gameBoard = document.createElement("div")
const player = document.createElement("img")
const bg = document.createElement("background")
const backgroudStart = document.createElement("div")
const btnStart = document.createElement("img")
const btnRetry = document.createElement("img")
const obstaculo = document.createElement("img")
const nave =  document.createElement("img")

const score = document.createElement("div")
const scoreImage = document.createElement("img")
const scoreNumber = document.createElement("h1")

const imgObstaculo = ['./img/obstaculo1.png', './img/obstaculo2.png', './img/obstaculo3.png', './img/obstaculo4.png']
const imgNav = ['./img/nave1.png', './img/nave3.png', './img/nave4.png']

btnStart.src = "./img/start.png"
btnRetry.src = "./img/retry.png"

body.appendChild(gameBoard)
gameBoard.appendChild(bg)
gameBoard.appendChild(backgroudStart)
backgroudStart.appendChild(btnStart)

gameBoard.classList.add("game-board")
backgroudStart.classList.add("background_start")
btnStart.classList.add("start")

const trocaObstaculo = () => {
  let randomOb = Math.floor(Math.random() * imgObstaculo.length)
  obstaculo.src = imgObstaculo[randomOb]
}

const trocaNav = () => {
  let randomNav = Math.floor(Math.random() * imgNav.length)
  console.log(randomNav)
  nave.src = imgNav[randomNav]
}

const start = () => {
  //remove backgroudStart btnStart
  backgroudStart.remove()
  btnStart.remove()
  
  player.src = "./img/player.gif"
  scoreImage.src = "./img/end.png"


  trocaObstaculo();
  let interObs = setInterval(trocaObstaculo, 1500)

  trocaNav();
  let interNav = setInterval(trocaNav, 5000)


  gameBoard.appendChild(player)
  gameBoard.appendChild(obstaculo)
  gameBoard.appendChild(score)
  gameBoard.appendChild(nave)
  score.appendChild(scoreImage)
  score.appendChild(scoreNumber)

  score.classList.add('score')
  scoreNumber.classList.add('scoreNumber')
  scoreImage.classList.add('scoreImage')
  obstaculo.classList.add("pipe_ob")
  player.classList.add("astronault")
  nave.classList.add("nave")

  //Astronauta e obstaculo
  const mario = document.querySelector('.astronault');
  const pipe = document.querySelector('.pipe_ob');

  //Jump
  const jump = () => {
    if (mario.classList != "jump") {
      mario.classList.add("jump")
    }
    setTimeout(() => {
      mario.classList.remove("jump")
    }, 500)
  }

  //Jump with space
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      jump();
    }
  });

  //Score
  let claudio = 0;
  const updateScore = setInterval(() => {
    claudio += 1;
    scoreNumber.innerHTML = `${("000000000" + claudio).slice(-9)}`;
  }, 100);

  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 80) {

      player.remove()
      obstaculo.remove()
      nave.remove()

      gameBoard.appendChild(backgroudStart)
      backgroudStart.appendChild(btnRetry)
      backgroudStart.appendChild(score)

      backgroudStart.classList.add("background_start")
      btnRetry.classList.add("retry")

      backgroudStart.style.flexDirection = 'column-reverse'

      clearInterval(updateScore);
      clearInterval(interObs);
      clearInterval(interNav);
      clearInterval(loop);
    }
  }, 1)
}

$(document).on('click', '.retry', function () {
  start();
})


$('.start').click(function () {
  start();
});