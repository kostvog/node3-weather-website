const { json } = require('express')
const request = require('request')
const forecast = (lat,lon, callback) =>{
const url = 'http://api.weatherstack.com/current?access_key=11cb1dad0f48e6d73d0b264709272fa8&query='+lat+','+lon

 request({url, json:true}, (error, {body})=> {
    if (error){
        callback('Unable to connect to weather service...',undefined)
     } else if (body.error) {
        callback('Unable to find location...',undefined)
    } else { 
      const msg = body.current.weather_descriptions[0]+'. the temperature is '+body.current.temperature+'oC and the wind speed is '+body.current.wind_speed+'km/h - '+body.current.wind_dir
      // const f={
      //    des: body.current.weather_descriptions[0],
      //    t: body.current.temperature,
      //    ws: body.current.wind_speed,
      //    wd: body.current.wind_dir
      // }
          const f={
             msg,
             icon: body.current.weather_icons[0]
          }
       callback(undefined, f)
   }
})
}
module.exports = forecast