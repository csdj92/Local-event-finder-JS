document.addEventListener("DOMContentLoaded", () => {
    getCities();
    City.newCityForm();
})


function toggleHideDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "block"
    } else {
        element.style.display = "none"
    }
}


// function getEvents() {
//     main
//     fetch(BASE_URL + '/cities')
//         .then(res => res.json())
//         .then(cities => {
//             cities.map(cities => {
//                 main.innerHTML += `
//        <li>
//        <a href="#" data-id=${cities.id}>${cities.name}</a>
//        </li>
//        `
//             });
//             eventLink()
//         })
// }
// getEvents()

// function eventLink() {
//     const events = document.querySelectorAll("li a")
//     events.forEach(events => {
//         events.addEventListener('click', displayEvents)
//     })
// }

// function displayEvents(e) {
//     console.log(e.target);
//     let id = e.target.dataset.id
//     main
//     main.innerHTML = ""
//     fetch(BASE_URL + `/cities/${id}`)
//         .then(resp => resp.json())
//         .then(city => { main.innerHTML +=`<h1>Events Happening in ${city.name}</h1>`

//             city.events.forEach(event => {
//                 main.innerHTML += `
//                 <li>${event.name}</li>
//                 <li>${event.description}</li>
//                 `
//             })
//             form.innerHTML +=  `
//             <form id="category-form" data-cityId="${city.id}">                
//             <label for="name">Name</label>
//             <input class="u-full-width" type="text" id="name" name="name">

//             <input type="hidden" id="cityID">
            
//             <label for="description">Description</label>
//             <input class="u-full-width" type="text" id="description" name="description">
    
//             <label for="date">Date</label>
//             <input class="u-full-width" type="text" id="date" name="date">
            
//             <label for="time">Time</label>
//             <textarea class="u-full-width" type="text" id="time" name="time"></textarea>
            
//             <button class="button-primary">Enter</button>
//             </form>
//             `
//         })
        
// }

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const name = formData.get('name');
//     const description = formData.get('description');
//     const date = formData.get('date');
//     const time = formData.get('time');
//     //const city = formData.get('city')

    

//     const makeEvent = {
//         name,
//         description,
//         date,
//         time,
//         city
        


//     };

//     fetch(BASE_URL + '/events', {
//             method: "POST",
//             body: JSON.stringify(makeEvent),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(resp => resp.json())
//         .then(event => {
//             console.log(event);

//         }).catch(Error)
// })