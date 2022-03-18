const serviceList = {
    0: {title: 'Wash Car', price: 10 },
    1: {title: 'Mow Lawn', price: 20 },
    2: {title: 'Pull Weeds', price: 30 },
}
let sum = 0 
let taskList = document.getElementById('task-list')
let notification = document.getElementById('notification')
let totalPrice = document.getElementById('total-price')
let notes = document.getElementById('notes')
let removeList = document.getElementById('remove-list')
const invoiceBtn = document.getElementById('invoice-btn')

const renderServiceButtons = Object.keys(serviceList).map(
    (service) => `<button id="${service}" class="service-btn">${serviceList[service].title}: $${serviceList[service].price}</button>`
)

document.getElementById("services").innerHTML = renderServiceButtons.join("")

const serviceButtons = document.querySelectorAll(".service-btn")

serviceButtons.forEach((element) => {
    element.addEventListener("click", applyService)
})

invoiceBtn.addEventListener("click", sendInvoice)

function applyService() {
    const service = serviceList[this.id]
    notes.textContent = "We accept cash, credit card, or PayPal"
    if (!taskList.innerHTML.includes(service.title)) {
        taskList.innerHTML += `<li id="task#${this.id}"><p>${service.title}<button class="remove-btn" id="remove-btn#${this.id}">Remove</button></p><p>$${service.price}</p></li>`
        sum += service.price
        totalPrice.textContent = `$${sum}`
        notification.textContent = ""
        document.querySelectorAll('.remove-btn').forEach((element) => {
            element.addEventListener("click", removeTask)
        })
    } else {
        notification.textContent = "You can't add the service more then once"
    }
}

function removeTask() {
    let id = (this.id).slice(this.id.indexOf('#') + 1)
    document.getElementById(`task#${id}`).remove()
    sum = totalPrice.textContent.slice(1)
    sum -= serviceList[id].price
    totalPrice.textContent = `$${sum}`
    if (sum === 0) {
        notes.textContent = ""
    }
}

function sendInvoice() {
    if (totalPrice.textContent.slice(1) !== '0') {
        invoiceBtn.textContent = "Sending.. Thank you for your order!"
        setTimeout(function() {location.reload()}, 2000)
    }
}