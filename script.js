const button = document.querySelector('#button');
// async function getGeoData() {

//     var GeolocationCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=Londonlimit=1&units=standard&appid=5c24ae42624e82bc2dd372d2ce2a5afc";
//     const request = await fetch(GeolocationCoordinates);
//     const response = await request.json();

//     console.log(response);
// }

// fetch(GeolocationCoordinates).then(function (response) {
//     console.log(response);
//     return response.json();
// }).then(function (data) {
//     console.log(data)
//     getWeather(data[0].lat, data[0].lon)
// });

function getWeather(latitude, longitude) {
    // console.log(latitude, longitude)
    var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=" + latitude + "&lon=" + longitude + "&appid=5c24ae42624e82bc2dd372d2ce2a5afc";
    fetch(weatherApi).then(async function (response) {

        // console.log(response);
        // console.log(await response.json());

        return response.json();
    }).then(function (data) {
        // entire data object
        console.log(data)
        console.dir(data.list)
        console.log(data.list[0])
       
        // update HTML elements to display weather data
        const temp = document.querySelector('#temp');
        temp.textContent = data.list[0].main.temp;

        const description = document.querySelector('#description');
        description.textContent = data.list[0].weather[0].description;

        const icon = document.querySelector('.icon');
        icon.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
        // console.log(icon.src)
        // const dt_txt = document.querySelector('#dt_txt');
        // dt_txt.textContent = data.list[0].dt_txt;
        // console.log(dt_txt.textContent)
        const temp_min = document.querySelector('#temp_min');
        temp_min.textContent = data.list[0].main.temp_min;
        const wind = document.querySelector('#wind');
        const humidity = document.querySelector('#humidity');
        humidity.textContent = data.list[0].main.humidity;
        wind.textContent = data.list[0].wind.speed;
        const mon = document.querySelector('#temp_mon');
        mon.textContent = data.list[8].main.temp;
        //above from monday
        //below from tuesday
        const tue = document.querySelector('#temp_tue');
        tue.textContent = data.list[16].main.temp;
        //below from wednesday
        const wed = document.querySelector('#temp_wed');
        wed.textContect = data.list[24].main.temp;
        //this could be a for loop
        const thur = document.querySelector('#temp_thur');
        
    });
}


button.addEventListener('click', async function () {
    const searchBar = document.querySelector('.search-bar');

    // console.log(searchBar)

    const request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=1&appid=5c24ae42624e82bc2dd372d2ce2a5afc`)
    const data = await request.json();

    // console.log(data);
    getWeather(data[0].lat, data[0].lon);
});
// let city = document.querySelector('.city');
// let weather = {
//     "appKey": "5c24ae42624e82bc2dd372d2ce2a5afc",
//     fetchWeather: function (city) {
//         fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=standard&appid=5c24ae42624e82bc2dd372d2ce2a5afc"
//         )
//             .then((response) => {
//                 if (!response.ok) {
//                     alert("No weather found.");
//                     throw new Error("No weather found.");
//                 }
//                 return response.json();
//             })
//             .then((data) => this.displayWeather(data));
//     },
//     displayWeather: function (data) {
//         const { name } = data;
//         const { icon, description } = data.weather[0];
//         const { temp, humidity } = data.main;
//         const { speed } = data.wind;
//         document.querySelector(".city").innerText = "Weather in " + name;
//         document.querySelector(".icon").src =
//             "https://openweathermap.org/img/wn/" + icon + ".png";
//         document.querySelector(".description").innerText = description;
//         document.querySelector(".temp").innerText = temp + "°C";
//         document.querySelector(".humidity").innerText =
//             "Humidity: " + humidity + "%";
//         document.querySelector(".wind").innerText =
//             "Wind speed: " + speed + " km/h";
//         document.querySelector(".weather").classList.remove("loading");
//     },
//     search: function () {
//         this.fetchWeather(document.querySelector(".search-bar").value);
//     },
// };

// document.querySelector(".search button").addEventListener("click", function () {
//     weather.search();
// });

// document
//     .querySelector(".search-bar")
//     .addEventListener("keyup", function (event) {
//         if (event.key == "Enter") {
//             weather.search();
//         }
//     });

// weather.fetchWeather("");