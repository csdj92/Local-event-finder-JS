const CITY_URL = 'http:localhost:3000/cities'
const main = document.getElementById('main')
const form = document.querySelector('form');
const container = document.querySelector('container')


class City{
    constructor(data){
        this.name = data.name
        this.events = data.events
        this.id = data.id
    }

    static newCityForm() {
    let newCityForm = document.getElementById('new-form')
    newCityForm.innerHTML = `
    <form onsubmit="createCity(); return false;">` + 
    cityForm + 
    `<input type="submit" value="Add New City" >
    </form>
    <br/>`
}
    static editCityForm(){
        let editCityForm = document.getElementById("new-form")
        editCityForm.innerHTML = `
        <form onsubmit="createCity(); return false;">` +
        cityForm +
        `<input type="submit" value="Update City"        
        </form>`
    }

    static cityHtml() {
     
        return `<div class="card" data-city-id="${this.id}">
                <strong class="city-name">${this.name}</strong> <br/> 
    
                <button class="view-events-button" style="background-color:blue">View events</button>  
                <button class="edit-city-button" style="background-color:orange">Edit Info</button>  
                <button class="delete-city-button" style="background-color:red">Delete City</button>
                </br></br>
                
                
                <div class="additional-info" style="display:none">     
                <strong>Description: </strong>${this.description}<br/>
                <strong>Status: </strong>${this.status}<br/>
                </div>
    
                </div>` 
    }
}


function getCities() {    
    fetch(CITY_URL )
    .then(res => res.json())
    .then(data => {
        renderCities(data)
        addCityEventListeners()
        addEventsClickListeners()
        //eventlistner??
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
        headers:{'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(city => {
        console.log(city);
        clearPage()
        getCities()
        City.newCityForm()
    });
}

function showMoreInfo() {
    console.log("this", this)
    console.log(this.parentElement.querySelector('.additional-info'))
    toggleHideDisplay(this.parentElement.querySelector('.additional-info'))
}


function deleteCity() {
    let cityId = this.parentElement.getAttribute('data-city-id')
    
    fetch( CITY_URL + `/${cityId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.text())
      .then(json => {
          let selectedCity = document.querySelector(`.card[data-city-id="${cityId}"]`) 
          selectedCity.remove()
      })
}

const cityForm = `
<label>City Name: </label><br>
<input type "text" id="cityName"><br>
<input type="hidden" id="cityId"></input>
`

function addCityEventListeners() {
    document.querySelectorAll('.event-name').forEach(element => {
       element.addEventListener("click", showMoreInfo)
   })

    //document.querySelectorAll('.edit-city-button').forEach(element => {
    //    element.addEventListener("click", editCity)
   // })

    document.querySelectorAll('.delete-city-button').forEach(element => {
        element.addEventListener("click", deleteCity)
    })

//    document.querySelector('.sort-button').addEventListener("click", sortCities)
   
}

function clearPage() {
    let cityIndex = document.getElementById("main")
    cityIndex.innerHTML = ''
}


City.prototype.cityEventsHtml = function () {

	let cityEvents = this.events.map(event => {
        

        return (`
        <div class="card" event-id="${event.id}" >        
        <strong>Title: </strong>${event.name} <br/>
        <strong>Description: </strong>${event.description} <br/>
        
        <button class="edit-event-button" style="background-color:orange">Edit Record</button>  
        <button class="delete-event-button" style="background-color:red">Delete Record</button>  
        </div>
		`)
    }).join('')

    return (cityEvents)
}


City.prototype.cityHtml = function () {
     
    return `<div class="card" data-city-id="${this.id}">
            <strong class="city-name">${this.name}</strong> <br/> 

            <button class="view-events-button" style="background-color:blue">View events</button>  
            <button class="edit-city-button" style="background-color:orange">Edit Info</button>  
            <button class="delete-city-button" style="background-color:red">Delete City</button>
            </br></br>
            
            
            <div class="additional-info" style="display:none">     
            <strong>Description: </strong>${this.description}<br/>
            <strong>Status: </strong>${this.status}<br/>
            </div>

            </div>` 
}

City.prototype.addEventButton = function () {

    let addNewEventButton = document.createElement('button')
    addNewEventButton.className = 'add-event-button'
    addNewEventButton.id = this.id 
    addNewEventButton.innerText = "Add Event"
    addNewEventButton.style.backgroundColor = "green"
     
    return addNewEventButton

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
        selectedCityHtml.append(eventsIndex.childElementCount ? eventsIndex : emptyEventsIndex )
        selectedCityHtml.querySelector('.events').appendChild(newCity.addEventButton())
    });

    
}
