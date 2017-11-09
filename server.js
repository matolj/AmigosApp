var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var config = require('./backend/appConfig')
var mongoose = require('mongoose')
var app = express()

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Connected on database !!!')
	}
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/frontend'))

app.get('*', function(req,res){
	res.sendFile(__dirname + '/frontend/index.html')
})

//routes
app.use('/api/sendEmail', require('./backend/api/sendEmail'))

app.listen(config.port, function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Listening on port 3000')
	}
})