const BASE_URL = 'http:localhost:3000'
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
    fetch(BASE_URL + '/cities')
    .then(res => res.json())
    .then(cities => {
        renderCities(cities)
        //eventlistner??
    })      
}

function createCity() {
    const city = {
        name: document.getElementById('cityName').value,
      // add more to a city?

    }

    fetch(BASE_URL + '/cities', {
        method: 'POST',
        body: JSON.stringify(city),
        headers:{'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(city => {
        clearpage()
        getCities()
        City.newCityForm()
    });
}
