let searchCity = function () {
  //console.log("Szukam miast");
  let inputValue = document.getElementById("citySelection").value;
  //console.log(inputValue);
};

let removeAllCities = function () {

  localStorage.removeItem("cities");
  dynamicallyRefresh();

};

let createCityHeading = function (li, headingText) {
  let divHeader = document.createElement("div");
  divHeader.classList.add("container");
  divHeader.classList.add("city");
  li.classList.add(headingText);
  let cityBasicInfo = document.createElement("div");
  cityBasicInfo.classList.add("cityBasicInfo");
  let h2CityName = document.createElement("h2");
  let h2WeatherName = document.createElement("h2");
  h2CityName.classList.add("cityName");
  h2WeatherName.classList.add("weatherName");
  let h3 = document.createElement("h3");
  h2CityName.innerHTML = headingText;
  cityBasicInfo.appendChild(h2CityName);
  cityBasicInfo.appendChild(h2WeatherName);
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

let getWeatherInfo = function (inputValue, li, addToLocalStorage = true) {

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
      setUpWeatherInfo(receivedData, li, addToLocalStorage);
    }, 1000);

  };
  getRequest.send();

};

let setUpWeatherInfo = function (receivedData, li, addToLocalStorage = true) {
  receivedData = JSON.parse(receivedData);
  if (receivedData.cod == 404) {
    li.querySelector(".specificInfo").innerHTML = "Nie znaleziono miasta";
    return;
  }

  if (addToLocalStorage) {
    addCityToLocalStorage(receivedData);
  }

  li.querySelector("h2.cityName").innerHTML = receivedData.name;
  li.querySelector("h2.weatherName").innerHTML = receivedData.weather[0].description;
  li.querySelector(".specificInfo").innerHTML =
    '<div class="specificInfoLeft">' +
    '<p>Ciśnienie <span>' + receivedData.main.pressure + ' hPa</span></p>' +
    '<p>Wilgotność <span>' + receivedData.main.humidity + ' %</span></p>' +
    '<p>Wiatr <span>' + receivedData.wind.speed + 'm/s</span><img src="/wind.png" alt="" class="windImg" style="transform: rotate(' + receivedData.wind.deg + 'deg"></p>' +
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

let addCity = function (inputValue, addToLocalStorage = true) {

  document.getElementById("citySelection").value = "";
  let addedCities = document.getElementById("addedCities");
  let ul = document.getElementById("list");
  let li = document.createElement("li");

  createCityHeading(li, inputValue);
  createCityLoader(li);

  addedCities.appendChild(li);
  li.style.opacity = 1;

  getWeatherInfo(inputValue, li, addToLocalStorage);
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

let addCityToLocalStorage = function (receivedData) {
  let storedCities;
  if (localStorage.getItem("cities") == undefined || localStorage.getItem("cities").length == 0) {
    localStorage.setItem("cities", {});
    storedCities = [];
  } else {
    storedCities = JSON.parse(localStorage.getItem("cities"));
  }

  storedCities.push({
    "name": receivedData.name
  });

  localStorage.setItem("cities", JSON.stringify(storedCities));
}

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
  let cityNameToRemove = cityOnList.querySelector(".cityName").innerHTML;
  cityOnList.parentNode.removeChild(cityOnList);

  console.log(cityOnList);

  //remove from local storage
  let storedCities;
  if (!(localStorage.getItem("cities") === null) || localStorage.getItem("cities") != undefined) {
    if (localStorage.getItem("cities").length != 0) {
      storedCities = JSON.parse(localStorage.getItem("cities"));
      console.log("To remove " + storedCities.indexOf({
        "name": cityNameToRemove
      }) + " " + cityNameToRemove);

      for (let i = 0; i < storedCities.length; i++) {
        if (storedCities[i].name == cityNameToRemove) {
          //storedCities.splice(i,1);
          storedCities = storedCities.filter(city => city.name != cityNameToRemove);
          //console.log(storedCities[i].name + " " + i);
        }
      }


      localStorage.setItem("cities", JSON.stringify(storedCities));
      // document.getElementById("addedCities").innerHTML = " ";
      // for (city of storedCities) {
      //   addCity(city.name, false);
      //   console.log(city.name);
      // }
    }
  }

  // if (localStorage.getItem("cities") == undefined || localStorage.getItem("cities").length == 0) {
  //   localStorage.setItem("cities", {});
  //   storedCities = [];
  // } else {
  //   storedCities = JSON.parse(localStorage.getItem("cities"));
  // }

  // storedCities.push({
  //   "name": receivedData.name
  // });

  // 

};

let dynamicallyRefresh = function () {

  let storedCities;
  if (!(localStorage.getItem("cities") === null) || localStorage.getItem("cities") != undefined) {
    if (localStorage.getItem("cities").length != 0) {
      storedCities = JSON.parse(localStorage.getItem("cities"));
      document.getElementById("addedCities").innerHTML = " ";
      for (city of storedCities) {
        addCity(city.name, false);
        console.log(city.name);
      }
    }
  } else {
    document.getElementById("addedCities").innerHTML = "";
  }

}

document.getElementById("citySelection").addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    let inputValue = document.getElementById("citySelection").value;
    addCity(inputValue);
  }
});

document.getElementById("citySelection").addEventListener("input", function () {
  searchCity();
});

document.addEventListener("DOMContentLoaded", function () {
  setClock();
  dynamicallyRefresh();
  setTimeout(function () {
    switchLoadingScreen();
  }, 500);
  window.setInterval(function () {
    setClock();
  }, 5000);
});