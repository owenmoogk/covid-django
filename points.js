laditude = null
longitude = null

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition)
}

function showPosition(position){
    x = document.getElementById("home")
    laditude = position.coords.latitude
    longitude = position.coords.longitude
}

function setHome(){
    getLocation()
    setTimeout(function(){ 
        localStorage.setItem("homeLaditude", laditude)
        localStorage.setItem("homeLongitude", longitude)
        alert("Home set to current location")
    }, 100);
}

function updateScreen(){
    if (localStorage.getItem("score") == null){
        localStorage.setItem("score","0")
    }
    if (localStorage.getItem("pointsAddedToday") == null){
        localStorage.setItem("pointsAddedToday","0")
    }
    document.getElementById("totalPoints").innerText = parseInt(localStorage.getItem("score"))
    document.getElementById("pointsAddedToday").innerText = '+'+localStorage.getItem("pointsAddedToday")
}

function scorePoints(){
    score = localStorage.getItem("score")
    score = parseInt(score)
    d = new Date()
    lastScoreHour = localStorage.getItem("lastScoreHour")
    lastScoreDate = localStorage.getItem("lastScoreDate")
    getLocation()
    if (Math.abs(laditude - parseInt(localStorage.getItem("homeLaditude"))) > 0.045 || Math.abs(longitude - parseInt(localStorage.getItem("homeLongitude"))) > 0.045){
        localStorage.setItem("stopScoring","true")
        localStorage.setItem("lastScoreDate", d.getDate())
    }
    if (String(d.getDate()) != localStorage.getItem("lastScoreDate")){
        localStorage.setItem("stopScoring", "false")
    }
    if (localStorage.getItem("stopScoring") == "false"){
        if (lastScoreHour == null){
            lastScoreHour = d.getHours()
            lastScoreDate = d.getDate()
        }
        if (d.getDate() == lastScoreDate){
            hoursPassed = d.getHours() - lastScoreHour
            score = parseInt(localStorage.getItem("score"))
            score = score + hoursPassed * 10
            localStorage.setItem("score", score)
            pointsAdded = parseInt(localStorage.getItem("pointsAddedToday"))
            pointsAdded += hoursPassed * 10
            localStorage.setItem("pointsAddedToday",pointsAdded)
        }
        else{
            localStorage.setItem("pointsAddedToday", "0")
        }
    }
    updateScreen()
}