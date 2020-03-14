var developerType = ["Java","Node.js","Backend","Frontend","MongoDB","SQLite","JavaFX","Database","Rest API"];
var elem = document.getElementById("developerType");
var counter = 0;
var inst = setInterval(cycleDeveloperTypeText, 1200);

function cycleDeveloperTypeText(){
  elem.innerHTML = developerType[counter];
  counter++;
  if (counter >= developerType.length) {
    counter = 0;
  }
}
