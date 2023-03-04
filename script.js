const cols = document.querySelectorAll(".col")
const button = document.querySelector(".update__btn")

document.addEventListener("keydown", (event) => {
  event.preventDefault()
  if (event.code === "Space"){
    setRandomColor()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type


  if (type === "lock"){

    const node = event.target.tagName.toLowerCase() == "i"
    ? event.target
    : event.target.children[0]
    node.classList.toggle("fa-lock-open")
    node.classList.toggle("fa-lock")
  }else if(type === "copy"){
    copyToClipBoard(event.target.textContent)
  }else if(type === "random__color"){
    setRandomColor()
  }
  
})

function setRandomColor(isInitial){
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    
    const text = col.querySelector('.color__text')
    const button = col.querySelector(".btn__lock")
    let isLocked = col.querySelector('i').classList.contains("fa-lock")

    if (isLocked){
      colors.push(text.textContent)
      return
    }
    // let color = chroma.random()
    const color = isInitial 
    ? colors[index] 
      ? colors[index]
      : generateRandomColor()
    : generateRandomColor()
   
    if(!isInitial){
      colors.push(color)
    }
   
    text.textContent = color
    col.style.background = color
    setTextColor(text, color)
    setButtonColor(button, color)
  })
  updateColorHash(colors)
}

function copyToClipBoard(text){
  return navigator.clipboard.writeText(text)
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

function updateColorHash(colors = []){
  document.location.hash = colors
  .map((color) => {
    return color
    .toString()
    .substring(1)
  }).join("-")
}

function getColorsFromHash(){
  if(document.location.hash.length > 1){
    return document.location.hash
    .substring(1)
    .split("-")
    .map(color => "#" + color)
  }
  return []
}

setRandomColor(true)
