const request = require('request')

// const forecast = (latitude,longitude,callback)=>{
//   const url = 'https://api.darksky.net/forecast/4a7bf3b84a3edeb422a1d220865cde71/' + latitude+ ',' + longitude +'?units=si'
//     request({url:url,json:true},(error,response)=>{
//       if(error){
//         callback("not connected",undefined)
//       }else if(response.body.error){
//         callback("cannot find parameter",undefined)
//       }else{
//         callback(undefined,response.body.daily.data[0].summary + "It is currently" + response.body.currently.temperature + "degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain")
//       }
//     })
// }

// module.exports = forecast

// Destructured part

const forecast = (latitude,longitude,callback)=>{
  const url = 'https://api.darksky.net/forecast/4a7bf3b84a3edeb422a1d220865cde71/' + latitude+ ',' + longitude +'?units=si'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback("not connected",undefined)
      }else if(body.error){
        callback("cannot find parameter",undefined)
      }else{
        callback(undefined,body.daily.data[0].summary + "It is currently" + body.currently.temperature + "degrees out. There is a " + body.currently.precipProbability + "% chance of rain")
      }
    })
}

module.exports = forecast