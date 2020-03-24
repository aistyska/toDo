//creates rounded icon for the first cell

function roundedIcon() {
    let td = document.createElement("td")
    let div = document.createElement("div")
    div.style.width = "24px"
    div.classList.add("rounded-circle", "text-center", "bg-success")
    let i = document.createElement("i")
    i.classList.add("fas", "fa-check-square", "text-white")
    td.appendChild(div).appendChild(i)
    return td
}

//creates tick button, task can be marked as done

function tickBtn() {
    let td = document.createElement("td")
    let button = document.createElement("button")
    button.setAttribute("type", "button")
    button.classList.add("btn", "btn-sm", "tick")
    let i = document.createElement("i")
    i.classList.add("fas", "fa-check")
    button.appendChild(i) 
    button.onclick = markAsDone
    td.appendChild(button)
    return td
}


function markAsDone(e) {
    classes = e.currentTarget.classList
    let tdTaskName = e.currentTarget.parentElement.nextElementSibling
    let statusCell = tdTaskName.nextElementSibling.nextElementSibling.nextElementSibling
    if (!classes.contains("active")){
        classes.add("active")
        tdTaskName.classList.add("completed")
        statusCell.textContent = "Complete"
    } else {
        classes.remove("active")
        tdTaskName.removeAttribute("class")
        statusCell.textContent = "In Progress"
    }
    let modifiedCell = tdTaskName.parentElement.lastChild.previousElementSibling
    modifiedCell.textContent = modified()
}


//creates priority label

function priorityLabel(priority) {
    let td = document.createElement("td")
    let div = document.createElement("div")
    div.classList.add("rounded-pill", "text-center", "text-white")
    if (priority === "High") {
        div.classList.add("bg-danger")
    } else if (priority === "Normal") {
        div.classList.add("bg-info")
    } else if (priority === "Low") {
        div.classList.add("bg-success")
    }
    div.textContent = priority
    td.appendChild(div)
    return td
}


//creates progress bar

function progressBar(percent) {
    let td = document.createElement("td")
    let label = document.createElement("label")
    label.classList.add("float-left", "mr-2")
    label.textContent = `${percent}%`
    td.appendChild(label)
    let div = document.createElement("div")
    div.classList.add("progress", "mt-1")
    let div2 = document.createElement("div")
    div2.classList.add("bg-success", "progress-bar", `w-${percent}`)
    div2.setAttribute("role", "progressbar")
    div2.setAttribute("aria-valuenow", percent)
    div2.setAttribute("aria-valuemin", "0")
    div2.setAttribute("aria-valuemax", "100")
    div.appendChild(div2)
    td.appendChild(div)
    return td
}


//current date and time

function modified() {
    let now = new Date()
    let date = now.toLocaleString("en-US")
    return date
}


//creates delete button and removes the row

function deleteBtn() {
    let td = document.createElement("td")
    let button = document.createElement("button")
    button.setAttribute("type", "button")
    button.classList.add("btn", "btn-danger", "btn-sm")
    let i = document.createElement("i")
    i.classList.add("fas", "fa-trash-alt")
    button.appendChild(i)
    tx = document.createTextNode(" Šalinti")
    button.appendChild(tx)
    button.onclick = deleteTask
    td.appendChild(button)
    return td
}


function deleteTask(e) {
    e.currentTarget.parentElement.parentElement.remove()
}



function addRow(task) {
    const tbody = document.querySelector("tbody")
    let tr = document.createElement("tr")

    let td = roundedIcon()
    tbody.appendChild(tr).appendChild(td) 

    tr.appendChild(tickBtn())

    // add subject
    td = document.createElement("td")
    td.textContent = task.subject
    tr.appendChild(td)

    tr.appendChild(priorityLabel(task.priority))

    //add due date
    td = document.createElement("td")
    td.textContent = task["Due Date"]
    tr.appendChild(td)

    //add status
    td = document.createElement("td")
    td.textContent = task.status
    tr.appendChild(td)

    tr.appendChild(progressBar(task["Percent Completed"]))

    //add modified date
    td = document.createElement("td")
    td.textContent = modified()
    tr.appendChild(td)

    tr.appendChild(deleteBtn())
}


function firstTasks() {
    addRow({
        subject: "Launch new website",
        priority: "High",
        "Due Date" : "04/01/2020",
        status: "Complete",
        "Percent Completed": "100"
    })
    addRow({
        subject: "Corporate rebranding",
        priority: "Low",
        "Due Date" : "04/07/2020",
        status: "In Progress",
        "Percent Completed": "75"
    })
    addRow({
        subject: "Staff training",
        priority: "Normal",
        "Due Date" : "04/15/2020",
        status: "New",
        "Percent Completed": "0"
    })
}


window.onload = firstTasks


function formSubmit(event) {
    event.preventDefault()
    $('#addTask').modal('hide')
    let task = {}
    const subject = document.querySelector("#subject").value
    task.subject = subject
    let priority = document.querySelector('[name="priority"]:checked').value
    priority = priority.slice(0, 1).toUpperCase() + priority.slice(1)
    task.priority = priority
    const date = document.querySelector("#dueDate").value
    task["Due Date"] = date
    const status = document.querySelector("#inputStatus").value
    task.status = status
    const perc = document.querySelector('[name="percentCompleted"]:checked').value
    task["Percent Completed"] = perc
    addRow(task)
    form.reset()
}

function resetForm() {
    form.reset()
}

const form = document.querySelector("form")

$('#addTask').on('hidden.bs.modal', resetForm)
form.onsubmit = formSubmit