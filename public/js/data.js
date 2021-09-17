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
let dataID = 0
let answer ="";

function runGame() {

    let arr = []
    dataID = dataID + 1
    arr = arrData[0].find(item => item.id == dataID)
    if (arr == undefined) {
        getImage.src = "https://i.pinimg.com/736x/34/2c/53/342c53cd4d6c8ae99097e19e4b44f2cf.jpg"
        document.getElementById("rohit").style.display = "none"
        document.getElementById("seconds").style.display = "none"
        document.getElementById("progressBar").style.display = "none"
        document.getElementById('test-guess').style.display = "none"
    }
    else {

        getImage.src = arr.url
        getText.innerHTML = arr.word.replace(arr.word.substring(1, arr.word.length - 1), "*******");
        answer = arr.word;
        btnclick
        document.getElementById('btnclick').innerText = "next"
    }
    // }, 10000);

    var timeleft = 10;
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        }
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
        document.getElementById("rohit").innerHTML = timeleft + 1;
        if (timeleft + 1 == 0) {
            document.getElementById("seconds").innerHTML = "Time's Up";
            document.getElementById('btnclick').innerText = "next"
            if (arr == undefined) {
                document.getElementById('btnclick').style.display = "none"
            }
            else {
                document.getElementById('btnclick').style.display = "block"
            }

        }
        else {
            document.getElementById("seconds").innerHTML = "seconds Left";
            document.getElementById('btnclick').innerText = "next"
            document.getElementById('btnclick').style.display = "none"
        }

    }, 1000);

}

// Listen for starting game
socket.on('startGame', ()=> {
    runGame();
});

btn.addEventListener('click', () => {

    socket.emit('playGame', 'Game started')
    runGame();

})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;
  
    msg = msg.trim();
  
    if (!msg) {
      return false;
    }
    if(msg ===  answer){
        msg = "Guessed it correctly"
    }
    // Emit message to server
    socket.emit('chatMessage', msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });



