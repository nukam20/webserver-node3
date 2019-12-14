const request = require('request')
// const geoCode = (address,callback)=>{
//   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib3JjaDIwIiwiYSI6ImNrMjQ3eGJtZjI1enAzb3F0YmtzOHQ3dDIifQ._B20zlcZrHqsbst95Pv1FQ&limit=1'
//   request({url:url,json:true},(error,response)=>{
//     if(error){
//       callback("unable to connect", undefined)
//     }else if(response.body.features.length === 0){
//       console.log(response.body.features.length)
//       callback("unable to find location, try another search")
//     }else{
//       callback(undefined,{
//         latitude : response.body.features[0].center[1],
//          longitude: response.body.features[0].center[0],
//          location: response.body.features[0].place_name
//       })
//     }
//   })
// }

// module.exports = geoCode

// destructured part
const geoCode = (address,callback)=>{
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib3JjaDIwIiwiYSI6ImNrMjQ3eGJtZjI1enAzb3F0YmtzOHQ3dDIifQ._B20zlcZrHqsbst95Pv1FQ&limit=1'
  request({url,json:true},(error,{body})=>{
    if(error){
      callback("unable to connect", undefined)
    }else if(body.features.length === 0){
      console.log(body.features.length)
      callback("unable to find location, try another search")
    }else{
      callback(undefined,{
        latitude : body.features[0].center[1],
         longitude: body.features[0].center[0],
         location: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode