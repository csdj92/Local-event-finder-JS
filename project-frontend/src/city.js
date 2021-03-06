const CITY_URL = 'http:localhost:3000/cities'
const main = document.getElementById('main')
const form = document.querySelector('form');
const container = document.querySelector('container')

const cityForm = `
<label>City Name: </label><br>
<input type "text" id="cityName"><br>
<input type="hidden" id="cityId"></input>
`

class City {
    constructor(data) {
        this.name = data.name
        this.events = data.events
        this.id = data.id
    }

    static newCityForm() {
        let newCityForm = document.getElementById('new-city')
        newCityForm.innerHTML = `
    <form onsubmit="createCity(); return false;">` +
            cityForm +
            `<input type="submit" value="Add New City" >
    </form>
    `
    }
    static editCityForm() {
        let editCityForm = document.getElementById("main")
        editCityForm.innerHTML = `
        <form onsubmit="updateCity(); return false;">` +
            cityForm +
            `<input type="submit" value="Update City"        
        </form>`
    }
    cityEventsHtml = function () {

        let cityEvents = this.events.map(event => {


            return (`
            <div class="card" event-id="${event.id}" >        
            <strong>Title: </strong>${event.name} <br/>
            <strong>Description: </strong>${event.description} <br/>
            <strong>Date: </strong>${event.date} <br/>
            <strong>Time: </strong>${event.time} <br/>
            
            <button class="btn btn-primary edit-event-button" >Edit Event</button>  
            <button class="btn btn-danger delete-event-button">Delete Event</button>  
            </div>
            `)
        }).join('')

        return (cityEvents)
    }
    cityHtml = function () {

        return `     
     
        
                <div class="card" data-city-id="${this.id}">
                <strong class="city-name">${this.name}</strong> <br/> 
                    
                <button class="btn btn-outline-info view-events-button">View events</button>  
                
                <button class="btn btn-outline-info delete-city-button">Delete City</button>

              
                
                
                
                <div class="additional-info" style="display:none">     
                <strong>Description: </strong>${this.description}<br/>
                <strong>Status: </strong>${this.status}<br/>
               
    
               
                
              </div></div>`
    } // <button class="btn btn-outline-info edit-city-button">Edit City</button>

    addEventButton = function () {

        let addNewEventButton = document.createElement('button')
        addNewEventButton.className = 'btn btn-primary add-event-button'
        addNewEventButton.id = this.id
        addNewEventButton.innerText = "Add Event"
        

        return addNewEventButton

    }
}


function getCities() {
    fetch(CITY_URL)
        .then(res => res.json())
        .then(data => {
            renderCities(data)
            addCityEventListeners()
            addEventsClickListeners()
           
        })
}

function createCity() {
    const city = {
        name: document.getElementById('cityName').value,
        // add more to a city?

    }

    fetch(CITY_URL, {
            method: 'POST',
            body: JSON.stringify(city),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(city => {            
            clearPage()
            getCities()
            City.newCityForm()
        });
}

function showMoreInfo() {   
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}


function deleteCity() {
    let cityId = this.parentElement.getAttribute('data-city-id')

    fetch(CITY_URL + `/${cityId}`, {
            method: 'DELETE'
        })
        .then(resp => resp.text())
        .then(json => {
            let selectedCity = document.querySelector(`.card[data-city-id="${cityId}"]`)
            selectedCity.remove()
        })
}

function updateCity() {
    let cityId = this.event.target.cityId.value

    const city = {
        name: document.getElementById('name').value,
        
    }
    fetch( CITY_URL + `/${cityId}`, {
        method: 'PATCH',
        body: JSON.stringify(city),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(city => {
         clearPage()
         renderCities()
         City.newCityForm()
        });
}

function editCity() {
    let cityId = this.parentElement.getAttribute('data-city-id')

    // Populate the city form with city's info
        fetch( CITY_URL + `/${cityId}`)
        .then(resp => resp.json())
        .then(data => {
            City.editCityForm()
            let cityForm = document.getElementById('main')
            cityForm.querySelector('#cityName').value

            
        })
}



function addCityEventListeners() {
    document.querySelectorAll('.event-name').forEach(element => {
        element.addEventListener("click", showMoreInfo)
    })

    document.querySelectorAll('.edit-city-button').forEach(element => {
        element.addEventListener("click", editCity)
     })

    document.querySelectorAll('.delete-city-button').forEach(element => {
        element.addEventListener("click", deleteCity)
    })

    

}

function clearPage() {
    let cityIndex = document.getElementById("main")
    cityIndex.innerHTML = ''
}


function renderCities(data) {
    let cityIndex = document.getElementById('main')

    data.forEach((city) => {

        let eventsIndex = document.createElement('div')
        eventsIndex.className = 'events'

        let emptyEventsIndex = eventsIndex

        let newCity = new City(city)
        eventsIndex.innerHTML = newCity.cityEventsHtml()

        cityIndex.innerHTML += newCity.cityHtml()



        let selectedCityHtml = document.querySelector(`.card[data-city-id="${newCity.id}"]`)
        selectedCityHtml.append(eventsIndex.childElementCount ? eventsIndex : emptyEventsIndex)
        selectedCityHtml.querySelector('.events').appendChild(newCity.addEventButton())
    });


}