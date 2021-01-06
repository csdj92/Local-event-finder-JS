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
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
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


