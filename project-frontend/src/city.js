const { func } = require("prop-types");

const CITY_URL = 'http:localhost:3000/cities'
const main = document.getElementById('main')
const form = document.querySelector('form');
const container = document.querySelector('container')

const cityForm = `
<label>City Name: </label><br>
<input type "text" id="cityName"><br>
<input type="hidden" id="cityId"></input>
`

class City{
    constructor(data){
        this.name = data.name
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


}


function getCities() {    
    fetch(CITY_URL + '')
    .then(res => res.json())
    .then(data => {
        renderCities(data)
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
        clearpage()
        getCities()
        City.newCityForm()
    });
}


City.prototype.dogHtml = function () {
     
    return `<div class="card" data-city-id="${this.id}">
            <button class="view-events-button" style="background-color:blue">View events</button>  
            <button class="edit-city-button" style="background-color:orange">Edit Info</button>  
            <button class="delete-city-button" style="background-color:red">Delete City</button>
            </br></br>
            <strong class="city-name">${this.name}</strong> <br/>           
            </div>` 
}

CIty.prototype.addEventButton = function () {

    let addNewEventButton = document.createElement('button')
    addNewEventButton.className = 'add-event-button'
    addNewEventButton.id = this.id 
    addNewEventButton.innerText = "Add Event"
    addNewEventButton.style.backgroundColor = "green"
     
    return addNewEventButton

}


function renderCities(data) {
    let cityIndex = document.getElementById('main')

    data.forEach(city => {
        
        let eventsIndex = document.createElement('div')
        eventsIndex.className = 'events'

        let emptyEventsIndex = eventsIndex

        let newCity = new City(city)
        cityIndex.innerHTML += newCity.cityHtml

        let selectedCityHtml = document.querySelector(`.card[data-city-id="${newCity.id}"]`)           
        selectedCityHtml.append(eventsIndexHtml.childElementCount ? eventsIndex : emptyEventsIndex )
        selectedCityHtml.querySelector('.events').appendChild(newCity.addEventButton())
    });

    
}
