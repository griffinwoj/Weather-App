const button = document.querySelector('#button');

async function getGeoData() {
  const GeolocationCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&units=standard&appid=5c24ae42624e82bc2dd372d2ce2a5afc";
  const request = await fetch(GeolocationCoordinates);
    const data = await request.json();
    console.log(data);
    getWeather(data[0].lat, data[0].lon);
}


fetch(GeolocationCoordinates).then(function (response) {
    console.log(response);
    return response.json();
}).then(function (data) {
    console.log(data)
    getWeather(data[0].lat, data[0].lon)
});

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
        // const temp = document.querySelector('#temp');
        // temp.textContent = data.list[0].main.temp;

        // const description = document.querySelector('#description');
        // description.textContent = data.list[0].weather[0].description;

        const icon = document.querySelector('.icon');
        icon.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
        // console.log(icon.src)
        // const dt_txt = document.querySelector('#dt_txt');
        // dt_txt.textContent = data.list[0].dt_txt;
        // console.log(dt_txt.textContent)
        const wind = document.querySelector('#wind');
        const humidity = document.querySelector('#humidity');
        humidity.textContent = data.list[0].main.humidity;
        wind.textContent = data.list[0].wind.speed;
        const mon = document.querySelector('#temp_mon');
        mon.textContent = data.list[8].main.temp;
        const mWind = document.querySelector('#mWind');
        mWind.textContent = data.list[8].wind.speed;
        const mHumidity = document.querySelector('#mHumidity');
        mHumidity.textContent = data.list[8].main.humidity;
        //above from monday
        //below from tuesday
        const tue = document.querySelector('#temp_tue');
        tue.textContent = data.list[16].main.temp;
        const tHumidity = document.querySelector('#tHumidity');
        tHumidity.textContent = data.list[16].main.humidity;
        const tWind = document.querySelector('#tWind');
        tWind.textContent = data.list[16].wind.speed;
        //below from wednesday
        const wed = document.querySelector('#temp_wed');
        wed.textContent = data.list[24].main.temp;
        const wHumidity = document.querySelector('#wHumidity');
        wHumidity.textContent = data.list[24].main.humidity;
        const wWind = document.querySelector('#wWind');
        wWind.textContent = data.list[24].wind.speed;
        //this could be a for loop
        const thur = document.querySelector('#temp_thur');
        thur.textContent = data.list[32].main.temp;
        const thHumidity = document.querySelector('#thHumidity');
        thHumidity.textContent = data.list[32].main.humidity;
        const thWind = document.querySelector('#thWind');
        thWind.textContent = data.list[32].wind.speed;
        //below from friday
        const fri = document.querySelector('#temp_fri');
        fri.textContent = data.list[38].main.temp;
        const fHumidity = document.querySelector('#fHumidity');
        fHumidity.textContent = data.list[38].main.humidity;
        const fWind = document.querySelector('#fWind');
        fWind.textContent = data.list[38].wind.speed;
        //below from saturday
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
let city = document.querySelector('.city');
let weather = {
    "appKey": "5c24ae42624e82bc2dd372d2ce2a5afc",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=standard&appid=5c24ae42624e82bc2dd372d2ce2a5afc"
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("");