const refs = {
    body: document.querySelector("body"),
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]")

}
refs.startBtn.addEventListener("click", changeColor)
refs.stopBtn.addEventListener("click", stopChangeColor)
let timeId = null

function changeColor() {
    timeId = setInterval(() => {
    const color = getRandomHexColor()
    console.log(color)
   refs.body.style.backgroundColor =  color        
    }, 1000)
    refs.startBtn.disabled  = true
}

function stopChangeColor() {
    clearInterval(timeId)
    refs.startBtn.disabled  = false

}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
