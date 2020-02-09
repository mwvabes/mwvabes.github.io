let searchCity = function () {
  //console.log("Szukam miast");
  let inputValue = document.getElementById("citySelection").value;
  //console.log(inputValue);
};

let createCityHeading = function (li, headingText) {
  let divHeader = document.createElement("div");
  divHeader.classList.add("container");
  divHeader.classList.add("city");
  li.classList.add(headingText);
  let cityBasicInfo = document.createElement("div");
  cityBasicInfo.classList.add("cityBasicInfo");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  h2.innerHTML = headingText;
  cityBasicInfo.appendChild(h2);
  cityBasicInfo.appendChild(h3);
  divHeader.appendChild(cityBasicInfo);

  let removeCityDiv = document.createElement("div");
  removeCityDiv.classList.add("removeCity");
  let removeCitySpan = document.createElement("span");
  removeCitySpan.innerHTML = "Usuń";
  removeCitySpan.setAttribute("onclick", "removeCityFromList(this);");
  removeCityDiv.appendChild(removeCitySpan);
  divHeader.appendChild(removeCityDiv);

  li.appendChild(divHeader);
};

let createCityLoader = function (li) {
  let divContent = document.createElement("div");
  divContent.classList.add("container");
  divContent.classList.add("specificInfo");
  let divLoader = document.createElement("div");
  divLoader.classList.add("loader");
  divLoader.innerHTML = "Ładowanie...";
  divContent.appendChild(divLoader);
  li.appendChild(divContent);
};

let getWeatherInfo = function (inputValue, li) {

  let getRequest = new XMLHttpRequest();
  let regexZipcode = new RegExp("^\\d\\d-\\d\\d\\d$");
  let apiQuery;
  if (regexZipcode.test(inputValue)) {
    apiQuery = "http://api.openweathermap.org/data/2.5/weather?zip=" + inputValue + ",pl&appid=06b943a95cb96f43870fe4b241feb758&units=metric&lang=pl";
  } else {
    apiQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue + ",pl&appid=06b943a95cb96f43870fe4b241feb758&units=metric&lang=pl";
  }

  getRequest.open('GET', apiQuery);
  getRequest.onload = function () {
    let receivedData = getRequest.responseText;
    setTimeout(function () {
      setUpWeatherInfo(receivedData, li);
    }, 1000);

  };
  getRequest.send();

};

let setUpWeatherInfo = function (receivedData, li) {
  receivedData = JSON.parse(receivedData);
  if (receivedData.cod == 404) {
    li.querySelector(".specificInfo").innerHTML = "Nie znaleziono miasta";
    return;
  }
  li.querySelector("h2").innerHTML = receivedData.name + ", " + receivedData.weather[0].description;
  li.querySelector(".specificInfo").innerHTML =
    '<div class="specificInfoLeft">' +
    '<p>Ciśnienie <span>' + receivedData.main.pressure + ' hPa</span></p>' +
    '<p>Wilgotność <span>' + receivedData.main.humidity + '</span></p>' +
    '<p>Wiatr <span>' + receivedData.wind.speed + '</span><img src="/wind.png" alt="" class="windImg" style="transform: rotate(' + receivedData.wind.deg + 'deg"></p>' +
    '</div>' +
    '<div class="specificInfoRight">' +
    '<p class="degrees">' +
    receivedData.main.temp + '&ordm;C' +
    '</p>' +
    '<p class="degreesRealFeel">' +
    'Odczuwalna: ' + receivedData.main.feels_like + '&ordm;C' +
    '</p>' +
    '</div>';
};

let addCity = function () {
  let inputValue = document.getElementById("citySelection").value;
  document.getElementById("citySelection").value = "";
  let addedCities = document.getElementById("addedCities");
  let ul = document.getElementById("list");
  let li = document.createElement("li");

  createCityHeading(li, inputValue);
  createCityLoader(li);

  addedCities.appendChild(li);
  li.style.opacity = 1;

  getWeatherInfo(inputValue, li);
};

let setClock = function () {
  let clocks = document.querySelectorAll(".clock");

  let getRequest = new XMLHttpRequest();
  let apiQuery = "http://worldclockapi.com/api/json/utc/now";
  let receivedData;
  getRequest.open('GET', apiQuery);
  getRequest.onload = function () {
    receivedData = JSON.parse(getRequest.responseText);
    let now = new Date(receivedData.currentDateTime);
    for (clock of clocks) {
      let clockMessage = now.getHours() + ":";
      if (now.getMinutes() < 10) {
        clockMessage += "0";
      }
      clockMessage += now.getMinutes();
      clock.innerHTML = clockMessage;
    }

    let welcomeMessage = document.querySelector(".welcomeMessage");
    if (now.getHours() >= 18 && now.getHours() < 21) {
      welcomeMessage.innerHTML = "Dobry wieczór";

    } else if (now.getHours() >= 21 || now.getHours() < 4) {
      welcomeMessage.innerHTML = "Dobrej nocy";
    } else {
      welcomeMessage.innerHTML = "Dzień dobry";
    }

    let footerYearMsg;
    if (now.getFullYear() > 2020) {
      footerYearMsg = "2020 - " + now.getFullYear();
    } else {
      footerYearMsg = "2020";
    }

    document.querySelector(".footerYear").innerHTML = footerYearMsg;
  };
  getRequest.send();

};

let switchLoadingScreen = function (shouldEnable = " ") {
  let loadingScreen = document.getElementById("loadingScreen");

  if (shouldEnable === true) {
    loadingScreen.style.display = "flex";
    loadingScreen.style.opacity = 1;
  } else if (shouldEnable === false) {
    loadingScreen.style.opacity = 0;
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 175);
  } else {
    window.getComputedStyle(loadingScreen).getPropertyValue("opacity") == 0 ? switchLoadingScreen(true) : switchLoadingScreen(false);
  }

};

let removeCityFromList = function (elem) {
  let cityOnList = elem.parentNode.parentNode.parentNode;
  cityOnList.parentNode.removeChild(cityOnList);
  
};

document.getElementById("citySelection").addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addCity();
  }
});

document.getElementById("citySelection").addEventListener("input", function () {
  searchCity();
});

document.addEventListener("DOMContentLoaded", function () {
  setClock();
  setTimeout(function () {
    switchLoadingScreen();
  }, 500);
  window.setInterval(function () {
    setClock();
  }, 5000);
});
