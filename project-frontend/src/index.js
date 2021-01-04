const BASE_URL = 'http:localhost:3000'
const main = document.getElementById('main')

function getEvents(){
    main
    fetch(BASE_URL + '/events')
    .then(res => res.json())
    .then(events => { events.map(events => {
        main.innerHTML += `
       <li>
       <a href="#" data-id=${events.id}>${events.description}</a>
       </li>
       `
    }); eventLink()
})
}
getEvents()

function eventLink(){
    const events = document.querySelectorAll("li a")
    events.forEach(events => {
        events.addEventListener('click', displayEvents)
    })
}

function displayEvents(e){
    console.log(e.target);
let id = e.target.dataset.id
main
main.innerHTML = ""
fetch(BASE_URL + `/events/${id}`)
.then(resp => resp.json())
.then(event => {
    console.log(event.time);
    main.innerHTML = `
    <h1>${event.name}</h1>
    <h2>${event.description}</h2>
    <h2>${event.time}</h2>


    `
})
}