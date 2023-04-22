const openWeatherKeyName = "283f5b61a999291d2471a6db61bf2b31";

let latArr = document.querySelectorAll('.lat');
let longArr = document.querySelectorAll('.long');
let mapDiv = document.getElementById("map");

const currPosition = {};

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    currPosition.lat = position.coords.latitude;
    currPosition.long = position.coords.longitude;
    latArr.forEach((ele) => {
        ele.innerHTML = "Lat: " + position.coords.latitude;
    });
    longArr.forEach((ele) => {
        ele.innerHTML = "Long: " + position.coords.longitude;
    });

    displayMap(currPosition.lat, currPosition.long);
    fetchWeatherData(currPosition.lat, currPosition.long);
}

function displayMap(latitude, longitude) {
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', mapUrl);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('style', 'border:0');
  
    mapDiv.appendChild(iframe);
}

function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${openWeatherKeyName}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle weather data here
      })
      .catch(error => {
        console.log(error);
        // Handle error here
      });
  }

document.getElementById("fetchData").addEventListener("click", getLocation);


// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c58308e4490aa1325e2b6aba3a805e31