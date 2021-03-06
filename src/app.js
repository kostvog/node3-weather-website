const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js') 

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const process = require('process')

const app = express()
const port = process.env.PORT || 3000

// paths for express config
const publicdirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Kostas Vogiatzis'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        name: 'Kostas Vogiatzis',
        place: 'Pallini',
        forecast: 'Skatokairos',
        title: 'About'
    })
})

const rndab = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

app.get('/help',(req, res)=>{
    res.render('help',{
        name: 'Kostas Vogiatzis',
        num: rndab(5,35),
        title: 'Help',
        crap: 'Sea'
    })
})
        

app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'popo'
        })
    }
    const addr = req.query.address
    geocode(addr, (er,{latitude,longitude,location}={})=>{
        if (er){
            console.log('ddd')
            return res.send({er})
        }
        forecast(latitude, longitude,  (error, {msg, icon}) => {
            if (error){
            return res.send({error})
        }
        //console.log(location+'\n'+data)
        res.send({
            icon: icon,
            forecast: msg,
            location,
            addr
      })
    })
   
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        name: 'Kostas Vogiatzis',
        errormsg: 'Help article not found',
        title: '404'
    })
})

app.get('/products',(req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        name: 'Kostas Vogiatzis',
        errormsg: 'My 404 page',
        title: '404'
    })
})

app.listen(port, () => { 
    console.log('Server is up on port'+port+'.')
})
