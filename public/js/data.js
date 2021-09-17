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


function runGame() {
    setInterval(function () {
        let arr = []
        dataID = dataID + 1
        arr = arrData[0].find(item => item.id == dataID)
        getImage.src = arr.url
        getText.innerHTML = arr.word.replace(arr.word.substring(1, arr.word.length - 1), "*******");
        
    }, 3000);

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
        }
        else {
            document.getElementById("seconds").innerHTML = "seconds Left";
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
  
    // Emit message to server
    socket.emit('chatMessage', msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });



