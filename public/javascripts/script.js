let form = document.getElementById("taskForm")
let title = document.getElementById("titleInput")
let details = document.getElementById("detailsInput")
let tasks = document.getElementById("tasksContainer")

form.addEventListener("submit", function(e){
    e.preventDefault()   // 🔥 VERY IMPORTANT

    let div = document.createElement("div")
    div.classList.add("task-card")

    div.innerHTML = `
        <h3>${title.value}</h3>
        <p>${details.value}</p>
        <a href="#">Read More</a>
    `

    tasks.classList.remove("hidden")
    tasks.appendChild(div)

    title.value = ""
    details.value = ""
})