console.log('client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) =>{
        console.log(data)
    })
})

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Loading...'
message2.textContent = ''

weatherform.addEventListener('submit', (ev) =>{
    ev.preventDefault()
  
const location = search.value
   fetch('http://localhost:3000/weather?address='+ location).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            //console.log(data.error)
            message2.textContent = data.error
        } else {
                // console.log(data.location)
                // console.log(data.forecast)
                message1.textContent = data.location
                message2.textContent = data.forecast
        }
    })
})

})

