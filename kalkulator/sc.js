

var courseTable = document.querySelector("#course-table");
var scoresOutput = document.querySelector("#scoresOutput");
var clearForm = document.querySelector("#clearForm");
var courseInput = document.querySelectorAll(".courseInput");
var clearFormInput = document.querySelector("#clearFormInput");

var plBasic = document.querySelector("#plBasic");
var mathBasic = document.querySelector("#mathBasic");
var langBasic = document.querySelector("#langBasic");
var plExt = document.querySelector("#plExt");
var mathExt = document.querySelector("#mathExt");
var langExt = document.querySelector("#langExt");
var biolExt = document.querySelector("#biolExt");
var chemExt = document.querySelector("#chemExt");
var philExt = document.querySelector("#philExt");
var physExt = document.querySelector("#physExt");
var geoExt = document.querySelector("#geoExt");
var histExt = document.querySelector("#histExt");
var csciExt = document.querySelector("#csciExt");
var wosExt = document.querySelector("#wosExt");
var coursesArr = [plBasic, mathBasic, langBasic, plExt, mathExt, langExt, biolExt, chemExt, philExt, physExt, geoExt, histExt, csciExt, wosExt];

var academics = ["wbisiaArchitektura", "wbisiaBudownictwo", "wbisiaOchronaSrodowiska", "wbisiaInzynieriaSrodowiska", "wbmilInzynieriaMaterialowa", "wbmilLotnictwoIKosmonautyka", "wbmilMechanikaIBudowaMaszyn", "wbmilMechatronika", "wbmilTransport", "wbmilZarzadzanieIInzynieriaProdukcji", "wchBiotechnologia", "wchInzynieriaChemiczna", "wchTechnologiaChemiczna", "weiiAutomatykaIRobotyka", "weiiElektronikaITelekomunikacja", "weiiElektrotechnika", "weiiEnergetyka", "weiiInformatyka", "wmifsInzynieriaMedyczna", "wmifsMatematyka", "wmtMechanikaIBudowaMaszyn", "wmtZarzadzanieIInzynieriaProdukcji", "wzBezpieczenstwoWewnetrzne", "wzFinanseIRachunkowosc", "wzLogistyka", "wzZarzadzanie"];

var yearColumns = 3;

//for (i = 0; i < coursesArr.length; i++) {
//  if (coursesArr[i].value === "") {
//    courseInput[i].value = 0;
//  }
//}

function colourScores(courseccc) {
  let courseForColour = document.getElementById(courseccc);
  let score = parseFloat(courseForColour.childNodes[3].innerHTML);
  let scores = [];
  
  let i;
  let j;
  
  for (i = 4; i <= (3 + yearColumns); i++) {
    scores[i] = parseFloat(courseForColour.childNodes[i].innerHTML);
  }
  
  for (j = 4; j < scores.length; j++) {
  
    if (score == 0 || isNaN(score)) {
      courseForColour.childNodes[j].className = "";
    }
    else if (score < scores[j]) {
      courseForColour.childNodes[j].className = "outRed"; 
    }
    else if (score >= scores[j]) {
      courseForColour.childNodes[j].className = "outGreen";
    }
  }
}

function colours() {
  let i;
  for (i = 0; i < academics.length; i++) {
    colourScores(academics[i]);
  }
}

function plBB() {
  let ret;
  if (plBasic.value > plExt.value) {
    ret = parseFloat(plBasic.value);
  } else {
    ret = parseFloat(plExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function langBEh() {
  let ret;
  if (langBasic.value > (1.5*langExt.value)) {
    ret = parseFloat(langBasic.value);
  } else {
    ret = parseFloat(1.5*langExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function mathBE() {
  let ret;
  if (mathBasic.value > (2*mathExt.value)) {
      ret = parseFloat(mathBasic.value);
      } else {
      ret = parseFloat(2*mathExt.value);
      }
  if (isNaN(ret)) ret = 0;
  return ret;
}
      
function histE() {
    let ret = parseFloat(2*histExt.value);
    if (isNaN(ret)) ret = 0;
    return ret;
}

function physE() {
    let ret = parseFloat(2*physExt.value);
    if (isNaN(ret)) ret = 0;
    return ret;
}

function physCsci() {
  let ret;
  if ((2*physExt.value) > (2*csciExt.value)) {
      ret = parseFloat(2*physExt.value);
      } else {
      ret = parseFloat(2*csciExt.value);
      }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function physChem() {
  let ret;
  if ((2*physExt.value) > (2*chemExt.value)) {
      ret = parseFloat(2*physExt.value);
      } else {
      ret = parseFloat(2*chemExt.value);
      }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function chePhys() {
  let ret;
  if ((2*chemExt.value) > (2*physExt.value)) {
      ret = parseFloat(2*chemExt.value);
      } else {
      ret = parseFloat(2*physExt.value);
      }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function bioChePhys() {
  let arr = [];
  arr.push(biolExt);
  arr.push(chemExt);
  arr.push(physExt);
  
  ret = arr[0];
  for (i = 1; i <= arr.length; i++) {
    if (arr [i] > arr[i-1]) ret = arr[i];
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function bioCheGeo() {
  let arr = [];
  arr.push(biolExt);
  arr.push(chemExt);
  arr.push(geoExt);
  
  ret = arr[0];
  for (i = 1; i <= arr.length; i++) {
    if (arr [i] > arr[i-1]) ret = arr[i];
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function chePhysCsci() {
  let arr = [];
  arr.push(chemExt);
  arr.push(physExt);
  arr.push(csciExt);
  
  ret = arr[0];
  for (i = 1; i <= arr.length; i++) {
    if (arr [i] > arr[i-1]) ret = arr[i];
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function bioChePhysCsci() {
  let arr = [];
  arr.push(biolExt);
  arr.push(chemExt);
  arr.push(physExt);
  arr.push(csciExt);
  
  ret = arr[0];
  for (i = 1; i <= arr.length; i++) {
    if (arr [i] > arr[i-1]) ret = arr[i];
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function plBBD() {
  let ret;
  if (plBasic.value > (2*plExt.value)) {
    ret = parseFloat(plBasic.value);
  } else {
    ret = parseFloat(2*plExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function langBED() {
  let ret;
  if (langBasic.value > (2*langExt.value)) {
    ret = parseFloat(langBasic.value);
  } else {
    ret = parseFloat(2*langExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function mathBED() {
  let ret;
  if (mathBasic.value > (4*mathExt.value)) {
    ret = parseFloat(mathBasic.value);
  } else {
    ret = parseFloat(4*mathExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function physCsciD() {
  let ret;
  if (4*(physExt.value) > (4*csciExt.value)) {
    ret = parseFloat(4*physExt.value);
  } else {
    ret = parseFloat(4*csciExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function chePhysCsciD() {
  let arr = [];
  arr.push(4*chemExt);
  arr.push(4*physExt);
  arr.push(4*csciExt);
  
  ret = arr[0];
  for (i = 1; i <= arr.length; i++) {
    if (arr [i] > arr[i-1]) ret = arr[i];
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function wosGeoHalf() {
  let ret;
  if (1.5*(wosExt.value) > (1.5*geoExt.value)) {
    ret = parseFloat(1.5*wosExt.value);
  } else {
    ret = parseFloat(1.5*geoExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function geoHistHalf() {
  let ret;
  if (1.5*(geoExt.value) > (1.5*histExt.value)) {
    ret = parseFloat(1.5*geoExt.value);
  } else {
    ret = parseFloat(1.5*histExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

function physGeo() {
  let ret;
  if (2*(physExt.value) > (2*geoExt.value)) {
    ret = parseFloat(2*physExt.value);
  } else {
    ret = parseFloat(2*geoExt.value);
  }
  if (isNaN(ret)) ret = 0;
  return ret;
}

//WBISIA
//WBISIA
//WBISIA

function wbisiaArchitektura() {
  let out = document.getElementById("wbisiaArchitektura");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + histE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbisiaBiogospodarka() {
  let out = document.getElementById("wbisiaBiogospodarka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + histE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbisiaBudownictwo() {
  let out = document.getElementById("wbisiaBudownictwo");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbisiaOchronaSrodowiska() {
  let out = document.getElementById("wbisiaOchronaSrodowiska");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + bioCheGeo();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbisiaInzynieriaSrodowiska() {
  let out = document.getElementById("wbisiaInzynieriaSrodowiska");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + bioChePhys();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WBISIA
//WBISIA
//WBISIA

//WBMIL
//WBMIL
//WBMIL

function wbmilInzynieriaMaterialowa() {
  let out = document.getElementById("wbmilInzynieriaMaterialowa");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + chePhys();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbmilLotnictwoIKosmonautyka() {
  let out = document.getElementById("wbmilLotnictwoIKosmonautyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbmilMechanikaIBudowaMaszyn() {
  let out = document.getElementById("wbmilMechanikaIBudowaMaszyn");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbmilMechatronika() {
  let out = document.getElementById("wbmilMechatronika");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbmilTransport() {
  let out = document.getElementById("wbmilTransport");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wbmilZarzadzanieIInzynieriaProdukcji() {
  let out = document.getElementById("wbmilZarzadzanieIInzynieriaProdukcji");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WBMIL
//WBMIL
//WBMIL

//WCH
//WCH
//WCH

function wchBiotechnologia() {
  let out = document.getElementById("wchBiotechnologia");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + bioChePhys();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wchInzynieriaChemiczna() {
  let out = document.getElementById("wchInzynieriaChemiczna");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + chePhysCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wchTechnologiaChemiczna() {
  let out = document.getElementById("wchTechnologiaChemiczna");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + bioChePhysCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WCH
//WCH
//WCH

//WEII
//WEII
//WEII

function weiiAutomatykaIRobotyka() {
  let out = document.getElementById("weiiAutomatykaIRobotyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function weiiElektronikaITelekomunikacja() {
  let out = document.getElementById("weiiElektronikaITelekomunikacja");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function weiiElektrotechnika() {
  let out = document.getElementById("weiiElektrotechnika");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function weiiEnergetyka() {
  let out = document.getElementById("weiiEnergetyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physChem();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function weiiInformatyka() {
  let out = document.getElementById("weiiInformatyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physCsci();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WEII
//WEII
//WEII

//WMIFS
//WMIFS
//WMIFS

function wmifsInzynieriaMedyczna() {
  let out = document.getElementById("wmifsInzynieriaMedyczna");
  let output = out.childNodes[3];
  let scores = plBBD() + langBED() + mathBED() + physCsciD();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wmifsMatematyka() {
  let out = document.getElementById("wmifsMatematyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + chePhysCsciD();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WMIFS
//WMIFS
//WMIFS

//WMT
//WMT
//WMT

function wmtMechanikaIBudowaMaszyn() {
  let out = document.getElementById("wmtMechanikaIBudowaMaszyn");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wmtZarzadzanieIInzynieriaProdukcji() {
  let out = document.getElementById("wmtZarzadzanieIInzynieriaProdukcji");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physE();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WMT
//WMT
//WMT

//WZ
//WZ
//WZ

function wzBezpieczenstwoWewnetrzne() {
  let out = document.getElementById("wzBezpieczenstwoWewnetrzne");
  let output = out.childNodes[3];
  let scores = plBB() + langBED() + histE() + wosGeoHalf();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wzFinanseIRachunkowosc() {
  let out = document.getElementById("wzFinanseIRachunkowosc");
  let output = out.childNodes[3];
  let scores = plBB() + langBED() + mathBE() + geoHistHalf();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wzLogistyka() {
  let out = document.getElementById("wzLogistyka");
  let output = out.childNodes[3];
  let scores = plBB() + langBEh() + mathBE() + physGeo();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

function wzZarzadzanie() {
  let out = document.getElementById("wzZarzadzanie");
  let output = out.childNodes[3];
  let scores = plBB() + langBED() + mathBE() + geoHistHalf();
  if (scores == 0) scores = "--";
  output.innerHTML = scores;
}

//WZ
//WZ
//WZ


//----------
//----------
//----------
//----------
//----------
//----------

function score() {
  wbisiaArchitektura();
  wbisiaBiogospodarka();
  wbisiaBudownictwo();
  wbisiaOchronaSrodowiska();
  wbisiaInzynieriaSrodowiska();
  
  wbmilInzynieriaMaterialowa();
  wbmilLotnictwoIKosmonautyka();
  wbmilMechanikaIBudowaMaszyn();
  wbmilMechatronika();
  wbmilTransport();
  wbmilZarzadzanieIInzynieriaProdukcji();
  
  wchBiotechnologia();
  wchInzynieriaChemiczna();
  wchTechnologiaChemiczna();
  
  weiiAutomatykaIRobotyka();
  weiiElektronikaITelekomunikacja();
  weiiElektrotechnika();
  weiiEnergetyka();
  weiiInformatyka();
  
  wmifsInzynieriaMedyczna();
  wmifsMatematyka();
  
  wmtMechanikaIBudowaMaszyn();
  wmtZarzadzanieIInzynieriaProdukcji();
  
  wzBezpieczenstwoWewnetrzne();
  wzFinanseIRachunkowosc();
  wzLogistyka();
 //  sport
  wzZarzadzanie();
}

function cutLast(str) {
  oldString = str.value;
  newString = oldString.substring(0, oldString.length - 1);
  return str.value = newString;
}

//Checks if user entered any letter or special char and deletes it (only numbers in input required)
function check() {
  
  for (i = 0; i < coursesArr.length; i++) {
    if ((coursesArr[i].value >= 0 && coursesArr[i].value <= 100) || coursesArr[i] == null) {}
    else if (coursesArr[i].value.slice(-1) == " ") {
      coursesArr[i].value = cutLast(coursesArr[i]);
    }
    else {
      coursesArr[i].value = cutLast(coursesArr[i]);
    }
  }
  setTimeout(function() {
      colours();
  }, 100);
  
}

var filledStatusPl = false;
var filledStatusMath = false;
var filledStatusLang = false;
// For the "reset" button to reset red cells or alerts of incorrect data
function filledStatusReset() {
  clearFormInput.classList.remove = "clearFormInputRed";
  clearFormInput.classList.add = "clearFormInputGreen";
  var inputsCorrect = document.querySelectorAll(".checkIfCorrect");
  for (i = 0; i < inputsCorrect.length; i++) {
    inputsCorrect[i].parentNode.parentNode.style.backgroundColor = "transparent";
    inputsCorrect[i].parentNode.parentNode.style.color = "";
  }
  var filledStatusPl = false;
  var filledStatusMath = false;
  var filledStatusLang = false;
  tdAlert.style.color = "green";
  setTimeout(function() {
      spanAlert.style.opacity = "";
      clearFormInput.classList.remove = "clearFormInputGreen";
      clearFormInput.classList.add = "clearFormInputRed";
  }, 900);
  setTimeout(function() {
        score();
      colours();
  }, 100);
}

//Checks if input is filled correctly
function unFilled(input) {
  var cell = input.parentNode.parentNode;
  var tdAlert = document.querySelector("#tdAlert");
  var trAlert = document.querySelector("#trAlert");
  var spanAlert = document.querySelector("#spanAlert");
  if (input.value == "") 
  {
    cell.style.color = "#FFF";
    cell.style.backgroundColor = "#ff5c5c";
    tdAlert.style.color = "";
    spanAlert.style.opacity = 1;
    
    if (input.id == "plBasic") filledStatusPl = true;
    if (input.id == "mathBasic") filledStatusMath = true;
    if (input.id == "langBasic") filledStatusLang = true;
    
    console.log(filledStatusPl, filledStatusMath, filledStatusLang);
    
  } 
  else if (input.value != "") 
  {
    if (input.id == "plBasic") filledStatusPl = false;
    if (input.id == "mathBasic") filledStatusMath = false;
    if (input.id == "langBasic") filledStatusLang = false;
    cell.style.color = "inherit";
    cell.style.backgroundColor = "transparent";
  }
  if (filledStatusPl == false && filledStatusMath == false && filledStatusLang == false) 
  {
    tdAlert.style.color = "green";
    setTimeout(function() 
    {
      spanAlert.style.opacity = "";
    }, 800);
  } 
}

document.addEventListener('DOMContentLoaded', function() {
  courseTable.addEventListener("keyup", function() {
  score();
}, false);
});

courseTable.addEventListener("keyup", function() {
  check();
}, false);

plBasic.addEventListener("blur", function() {
  unFilled(plBasic);
}, false);

mathBasic.addEventListener("blur", function() {
  unFilled(mathBasic);
}, false);

langBasic.addEventListener("blur", function() {
  unFilled(langBasic);
}, false);

/*plBasic.addEventListener("keyup", function() {
  unFilled(plBasic);
}, false);

mathBasic.addEventListener("keyup", function() {
  unFilled(mathBasic);
}, false);

langBasic.addEventListener("keyup", function() {
  unFilled(langBasic);
}, false);*/

clearFormInput.addEventListener("click", function() {
  filledStatusReset();
  setTimeout(function() {
      score();
  }, 100);
}, false);

/*courseInput.addEventListener("blur", function() {
  checkIfAnythingFilled();
}, false);*/


document.addEventListener('DOMContentLoaded', function() {
  courseTable.addEventListener("blur", function() {
  score();
}, false);
  
  score();
  colours();
}, false);



