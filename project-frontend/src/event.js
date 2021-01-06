const EVENT_URL = 'http:localhost:3000/events'

class Event { 
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.city_id = data.city_id
        this.description = data.description
        this.date = data.date
        this.time = data.time
    }
}

function addEvent() {
    const event = {
        name: document.getElementById('name').value,
        description: document.getElementById('event-description').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        city_id: document.getElementById('event-cityId').value       

    }
    fetch(EVENT_URL,{
        method: 'POST',
        body: JSON.stringify(event),
        headers:{'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(event => {
        console.log(event)
        clearPage()
        getCities()
    });
}

function renderEventForm(cityId) {
    return `
    <label><strong>Name: </strong></label><br/>
    <input type="text" id="name"><br/>

    <input type="hidden" id="event-cityId" value="${cityId}">

    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="event-description"><br/>

    <label><strong>Date:   </strong></label><br/>
    <input type="text" id="event-date"><br/>

    <label><strong>Time:   </strong></label><br/>
    <input type="text" id="event-time"><br/>   

    <input type="submit" value="Submit" style="color:white;background-color:orange">
    `  
}

function renderNewEventForm() {
    let cityId = this.getAttribute('id')
    this.style.display = "none"
    let eventsHtml = this.parentElement
    let eventForm = document.createElement('form')
    eventForm.setAttribute("onsubmit", "addEvent(); return false;")
    eventForm.innerHTML = renderEventFormFields(cityId)
    eventsHtml.appendChild(eventForm)
}

function renderEventFormFields(cityId) {
    return `
    <label><strong>Name: </strong></label><br/>
    <input type="text" id="name"><br/>

    <input type="hidden" id="event-cityId" value="${cityId}">

    <label><strong>Description:   </strong></label><br/>
    <input type="text" id="event-description"><br/>

    <label><strong>Date:   </strong></label><br/>
    <input type="text" id="event-date"><br/>

    <label><strong>Time:   </strong></label><br/>
    <input type="text" id="event-time"><br/>   

    <input type="submit" value="Submit" style="color:white;background-color:orange">    
    `  
}


function addEventsClickListeners() {
    document.querySelectorAll('.view-events-button').forEach(element => {
        element.addEventListener('click', viewEvents)
    })

    document.querySelectorAll('.add-event-button').forEach(element => {
        element.addEventListener('click', renderNewEventForm)
    })
    
    document.querySelectorAll('.edit-event-button').forEach(element => {
        element.addEventListener("click", editEvent)
    })

    document.querySelectorAll('.delete-event-button').forEach(element => {
        element.addEventListener("click", deleteEvent)
    })

}

function updateEvent() { 
    let eventId = this.event.target.parentElement.getAttribute('event-id')     
    let eventElement = document.querySelector(`.card[event-id="${eventId}"]`)
        
     let event = {
        name: eventElement.querySelector('name').value,
        description: eventElement.querySelector('description').value,
        date: eventElement.querySelector('date').value,
        time: eventElement.querySelector('time').value,
        city_id: eventElement.querySelector('event-cityId').value,
     }
       

    fetch(EVENT_URL + `/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(data => {
        console.log(data);
         clearPage()
         getCities()  
         City.newCityForm()
    })
}

function populateEventForm(data) { 
    let event = new Event(data)
    let eventForm = renderEventForm(event.city_id)
    
    eventForm.querySelector('#name').value = event.name 
    eventForm.querySelector('#event-description').value = event.description 
    eventForm.querySelector('#event-date').value = event.date
    eventForm.querySelector('#event-time').value = event.time
    eventForm.querySelector('#event-cityId').value = event.city_id 
    document.querySelector(`.card[event-id="${event.id}"]`).appendChild(eventForm)
}

function editEvent() { 
    toggleHideDisplay(this)

    let eventId = this.parentElement.getAttribute('event-id')
    console.log("eventId", eventId)
    fetch(EVENT_URL + `/${eventId}`)
    .then(resp => resp.json())
    .then(data => {

        populateEventForm(data)
 
    })

}
function deleteEvent() {
    let eventId = this.parentElement.getAttribute('event-id')

    fetch( EVENT_URL + `/${eventId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(json => {
          let selectedEvent = document.querySelector(`.card[event-id="${eventId}"]`) 
          selectedEvent.remove()
      })
}


function viewEvents() {
    City.newCityForm()
    let citySelectedHtml = this.parentElement.querySelector('.events')
    toggleHideDisplay(citySelectedHtml)
}





