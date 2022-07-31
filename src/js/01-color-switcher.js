const refs = {
    body: document.querySelector("body"),
    startBtn: document.querySelector([data-start]),
    stopBtn: document.querySelector([data-stop])

}
refs.startBtn.addEventListener("click", changeColor)

function changeColor() {
    const color = getRandomHexColor
   body.styleList.backgroundColor =  color
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}