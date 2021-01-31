function graph(tempArray){
    var ctx = document.getElementById("myChart")
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Today', 'Yesterday', 'Jan 29', 'Jan 28', 'Jan 27', 'Jan 26'],
            datasets: [{
                label: 'Temperature',
                data: tempArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)'],
                borderWidth: 1
            }]
        },
        options: {
            defaultFontColor: "black",
            legend: {
                labels: {
                    fontColor: "black",
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function getTemp(){
    array = []
    for (i = 1; i <= 7; i++){
        accessString = "tempDay" + String(i)
        array.push(Number(localStorage.getItem(accessString)))
    }
    console.log(array)
    d = new Date()
    graph(array)
}

function logTemp(temp){
    for(i = 7; i > 1; i--){
        accessString = "tempDay" + String(i)
        accessStringForward = "tempDay" + String(i - 1)
        forwardValue = localStorage.getItem(accessStringForward)
        console.log(forwardValue)
        localStorage.setItem(accessString, forwardValue)
    }
    localStorage.setItem("tempDay1", temp)
    getTemp()
}

function logTempFromInput(){
    temp = document.getElementById("tempInput").value
    temp = parseInt(temp)
    if (Number.isInteger(temp) || isFloat(temp)){
        if (temp > 100.4){
            alert("That is a high temperature. Please have a look at public health guidelines for next steps.")
            window.open("https://www.ontario.ca/page/covid-19-stop-spread")
        }
        if (temp < 94){
            alert("This is a very cold temperature. You may have hypothermia. Retake temperature for source of errors, and if you still have a low temperature please contact a doctor.")
            window.open("http://www.health.gov.on.ca/en/public/programs/emu/emerg_prep/et_cold.aspx")
        }
        var d = new Date()
        if (localStorage.getItem("lastEnterDate") != d.getDate()){
            logTemp(temp)
            localStorage.setItem("lastEnterDate", d.getDate())
        }
    }
    else{
        alert("Please enter a valid number")
    }
}

function isFloat(n){
    return Number(n) == n && n % 1 == 0
}