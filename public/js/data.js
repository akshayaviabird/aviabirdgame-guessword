let arrData = []

fetch('https://immense-dusk-54293.herokuapp.com/api/v1/guessimage')
    .then((response) => response.json())
    .then((result) => {

        arrData.push(result.data[0].data)
    }).catch((err) => {
        console.log(err)
    })

let btn = document.getElementById('btnclick')
let getImage = document.getElementById('displayImage')
let getText = document.getElementById('test-guess')
let dataID = 1

btn.addEventListener('click', () => {
    setInterval(function () {

        let arr = []
        dataID = dataID + 1
        arr = arrData[0].find(item => item.id == dataID)
        getImage.src = arr[0].url
        getImage.innerHTML = arr[0].word.replace(str.substring(1, arr[0].word.length - 1), "*******");
    }, 3000);
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
        document.getElementById("rohit").innerHTML = timeleft + 1;
        if (timeleft + 1 == 0) {
            document.getElementById("seconds").innerHTML = "Time's Up";
        }
        else {
            document.getElementById("seconds").innerHTML = "seconds Left";
        }

    }, 1000);


})



