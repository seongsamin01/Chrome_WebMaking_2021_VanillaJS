const weather = document.querySelector(".js-weather");
const API_KEY = "99919bb4c713e197195d5c6ace9d21df";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `Temp: ${temperature}°C @ Place: ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
 saveCoords(coordsObj);
 getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("You Can't access geolocation");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}
function init(){
    loadCoords();
}

init();