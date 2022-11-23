const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet, 
ringtone = new Audio("./files/ringtone.mp3");

// Generate dropdownlist option - Jam
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate dropdownlist option - Minit
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate dropdownlist option - AM/PM
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    // extract datetime
    let date = new Date(),
    // dd = date.getDay(),
    // mm = date.getMonth(),
    // yyyy = date.getFullYear(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    // convert 24H to 12AM/PM
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    // replace '0' with 12'
    h = h == 0 ? h = 12 : h;
    // padleft(2,"0")
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // set display
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    // play ringtone if current time = alarm time
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

function setAlarm() {
    if (isAlarmSet) {
        // disable alarm
        alarmTime = "";
        ringtone.pause();
        // enable field
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Tetapkan Penggera";
        setAlarmBtn.setAttribute("style", "background: #4A98F7;")
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Jam") || time.includes("Minit") || time.includes("AM/PM")) {
        return alert("Sila pilih masa yang sah untuk menetapkan penggera!");
    }
    // enable alarm
    alarmTime = time;
    isAlarmSet = true;
    // disable field
    content.classList.add("disable");
    setAlarmBtn.innerText = "Nyah Penggera";
    setAlarmBtn.setAttribute("style", "background-color: red;")
}

setAlarmBtn.addEventListener("click", setAlarm);

contentprayer = document.querySelector(".content1")

function listenToUserSelect() {
    let urlMe = "https://mpt.i906.my/mpt.json?code=sgr-1&filter=1";
    fetch(urlMe)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data.response.place);
  
        let personArray = data.response.times;
        let resultantArray = personArray.map((name) => [name]);
        //   console.log(resultantArray);
  
        for (var i = 0; i < resultantArray.length; i++) {
          // console.log(resultantArray[i]);
          if (i == 0) convertTime(resultantArray[i], "Subuh");
          if (i == 1) convertTime(resultantArray[i], "Imsak");
          if (i == 2) convertTime(resultantArray[i], "Zohor");
          if (i == 3) convertTime(resultantArray[i], "Asar");
          if (i == 4) convertTime(resultantArray[i], "Magrib");
          if (i == 5) convertTime(resultantArray[i], "Isyak");
        }
      });
  }
  
  function convertTime(unix_timestamp, typeme) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
        // convert 24H to 12AM/PM
        if(hours >= 12) {
            hours = hours - 12;
            ampm = "PM";
        } else {
            ampm = "AM";
        }
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
  
    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2) + " " + ampm;
    // hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    //   console.log(formattedTime);
    var label1 = document.createElement("div");
    label1.innerHTML = "<button id=" + typeme + " onClick=setAlarmPrayer('" + unix_timestamp +"');>" + typeme + " : " + formattedTime + "</button>";
    contentprayer.appendChild(label1);''
  }
  
  listenToUserSelect();

   function setAlarmPrayer(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
        // convert 24H to 12AM/PM
        if(hours >= 12) {
            hours = hours - 12;
            ampm = "PM";
        } else {
            ampm = "AM";
        }
    hours = hours < 10 ? "0" + hours : hours;
    // Minutes part from the timestamp
   var minutes = date.getMinutes();
   minutes = minutes < 10 ? "0" + minutes : minutes;
    // enable alarm
    alarmTime = hours + ":" + minutes + " " + ampm;
    isAlarmSet = true;

    // set value to dropdownlist
    selectMenu[0].value = hours
    selectMenu[1].value = minutes
    selectMenu[2].value = ampm

    // disable field
    content.classList.add("disable");
    setAlarmBtn.innerText = "Nyah Penggera";
    setAlarmBtn.setAttribute("style", "background-color: red;")
    alert("Penggera telah ditetapkan pada " + alarmTime) 
}