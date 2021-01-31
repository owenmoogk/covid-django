function populateHomeScreen(){
    score = localStorage.getItem("score")
    scoreToday = localStorage.getItem("pointsAddedToday")
    document.getElementById("points").innerText = score
    document.getElementById("pointsToday").innerText = "+"+scoreToday
}