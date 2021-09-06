
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
message1.textContent = ''
message2.textContent = ''

weatherform.addEventListener('submit', (ev) =>{
    ev.preventDefault()
    message1.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+ location).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent = data.error
            message2.textContent = ''
        } else {
            if (document.images.length===0){
                var img = document.createElement('img')
                img.src = data.icon
                document.getElementById('p1').appendChild(img)
            } else{
                var a = document.querySelector('img')
                a.src = data.icon
            }
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})

})

