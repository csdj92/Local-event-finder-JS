const BASE_URL = 'http:localhost:3000'
const main = document.getElementById('main')
const form = document.querySelector('form');

function getEvents() {
    main
    fetch(BASE_URL + '/cities')
        .then(res => res.json())
        .then(events => {
            events.map(events => {
                main.innerHTML += `
       <li>
       <a href="#" data-id=${events.id}>${events.name}</a>
       </li>
       `
            });
            eventLink()
        })
}
getEvents()

function eventLink() {
    const events = document.querySelectorAll("li a")
    events.forEach(events => {
        events.addEventListener('click', displayEvents)
    })
}

function displayEvents(e) {
    console.log(e.target);
    let id = e.target.dataset.id
    main
    main.innerHTML = ""
    fetch(BASE_URL + `/cities/${id}`)
        .then(resp => resp.json())
        .then(city => { 
           
            city.events.forEach(event => {
                main.innerHTML += `
                <li>${event.name}</li>
                <li>${event.description}</li>
                `
            })        })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const description = formData.get('description');
    const date = formData.get('date');
    const time = formData.get('time');
    //const city = formData.get('city')

    const makeEvent = {
        name,
        description,
        date,
        time,
        
    };

    fetch(BASE_URL + '/events', {
            method: "POST",
            body: JSON.stringify(makeEvent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(event => {
            console.log(event);

        }).catch(Error)
})