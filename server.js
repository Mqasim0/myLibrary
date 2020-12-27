if(process.env.NODE_ENV !== 'production'){
   require('dotenv').config()
}

const express = require('express') // import express library
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')



app.set('view engine', 'ejs') // set the view engine
app.set('views', __dirname +  '/views')  // where views are coming from
app.set('layout', 'layouts/layout') // layout files
app.use(expressLayouts) // 
app.use(express.static('public')) // public files images css etc
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

// connect to the database

mongoose.connect(process.env.DATABASE_URL,{
  useUnifiedTopology: true,
  useNewUrlParser: true
})
 const db = mongoose.connection
 db.on('error', (error)=>console.error(error))
 db.once('open ', ()=> console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)


app.listen(process.env.PORT || 3000)