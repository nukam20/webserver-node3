const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views' )
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// app.get('',(req,res)=>{
//   res.send("<h1>Hello Express</h1>")
// })


app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:"Uche"
  })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'about',
    name:"Uche"
  })
})
app.get('/help',(req,res)=>{
  res.render('help',{
    title:'help',
   message:"I don't know what next to do"
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:"Please input an address"
    })
  }
  geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
  // res.send({
  //   forecast:"It will be rainy with 65'c",
  //   location:"Philadelphia",
  //   address:req.query.address
  // })
})

app.get('/product',(req,res)=>{

  if(!req.query.search){
   return res.send("No query provided")
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})
app.get('*',(req,res)=>{
  res.render("404",{
    title:"Error",
    errMsg:"Help article not found"
  })
})
app.get('*',(req,res)=>{
  res.render("404",{
    title:"Error",
    errMsg:"Page not found"
  })
})
app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})