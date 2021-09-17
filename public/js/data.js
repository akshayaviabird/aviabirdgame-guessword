let arrData=[]

fetch('https://immense-dusk-54293.herokuapp.com/api/v1/guessimage')
.then((response)=>response.json())
.then((result)=>{

    arrData.push(result.data[0].data)
    console.log("ssss",arrData[0])
}).catch((err)=>{
    console.log(err)
})

let btn=document.getElementById('btnclick')
let getImage=document.getElementById('displayImage')
btn.addEventListener('click',()=>{
getImage.src=arrData[0] 

})