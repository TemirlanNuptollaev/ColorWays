const cols = document.querySelectorAll(".col")
const button = document.querySelector(".update__btn")


function setRandomColor(){
  cols.forEach(col => {
    const text = col.querySelector('.color__text')
    const button = col.querySelector(".btn__lock")
    let color = chroma.random()
    // let color = generateRandomColor()
    text.textContent = color
    col.style.background = color
    setTextColor(text, color)
    setButtonColor(button, color)
  })
}

function generateRandomColor(){
  let color = ''
  const hexCode = '1234567890ABCDEF'

  for(i=0; i<6; i++){
    color += '' + hexCode[Math.floor(Math.random() * hexCode.length)]
  }
  return "#" + color
}

function setTextColor(text, color){
  let luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? "black" : "white"
}

function setButtonColor(button, color){
  let luminance = chroma(color).luminance()
  button.style.color = luminance > 0.5 ? "black" : "white"
}

setRandomColor()

button.addEventListener('click', setRandomColor)