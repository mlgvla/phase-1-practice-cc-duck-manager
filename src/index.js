let duckNav = document.getElementById("duck-nav")
let duckDispName = document.getElementById("duck-display-name")
let duckDispImg = document.getElementById("duck-display-image")
let duckDispLikes = document.getElementById("duck-display-likes")
let newDuckForm = document.getElementById("new-duck-form")

function renderDuck(duck) {
  let duckImg = document.createElement("img")
  duckImg.src = duck.img_url
  duckImg.addEventListener("click", () => showDuck(duck))
  duckNav.append(duckImg)
}

function showDuck(duck) {
  duckDispName.textContent = duck.name
  duckDispImg.src = duck.img_url
  duckDispLikes.textContent = `${duck.likes} Likes`
  duckDispLikes.addEventListener("click", addLikes)
}

function addLikes() {
  let likes = parseInt(duckDispLikes.textContent.split(" ")[0])
  likes++
  duckDispLikes.textContent = `${likes} likes`
}

function addDuck(e) {
  e.preventDefault()
  let newDuck = {
    name: newDuckForm["duck-name-input"].value,
    img_url: newDuckForm["duck-image-input"].value,
    likes: 0,
  }
  saveDuck(newDuck)
  // renderDuck(newDuck)
  newDuckForm.reset()
}

function saveDuck(newDuck) {
  fetch("http://localhost:3000/ducks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDuck),
  })
    .then(r => r.json())
    .then(duck => {
      renderDuck(duck)
      showDuck(duck)
    })
}

function app() {
  fetch("http://localhost:3000/ducks")
    .then(r => r.json())
    .then(duckArr => {
      duckArr.forEach(duck => {
        renderDuck(duck)
      })
      showDuck(duckArr[0])
    })
  newDuckForm.addEventListener("submit", addDuck)
}

app()
