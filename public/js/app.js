
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

message1.textContent = ''
message2.textContent = ''
message3.textContent = ''

weatherform.addEventListener('submit', (ev) =>{
    ev.preventDefault()
    message1.textContent = 'Loading...'
    fetch('http://puzzle.mead.io/puzzle').then((response) => {
        response.json().then((crap) =>{
        message3.textContent = crap.puzzle
        })
    })
    const location = search.value
    fetch('/weather?address='+ location).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent = data.error
            message2.textContent = ''
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})

})

