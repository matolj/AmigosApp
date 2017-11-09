var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')
var config = require('../appConfig')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))

router
	.post('/', function(req,res,next){

		var isEmail = validateEmail(req.body.email)

		if(req.body.name == undefined || req.body.message == undefined || req.body.email == undefined || isEmail==false){
			res.status(400).json('Check Your Form Inputs! Input Your Name, Your Contact Email and Message!!')
		}else{

			let transporter = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					type: 'OAuth2',
					clientId: config.clientId,
					clientSecret: config.clientSecret
				}
			})
		
			fs.readFileAsync('backend/mailService/question.html', 'utf8')
			.then(data => {
				var mailHtml = data.replace(/{name}/g,req.body.name).replace(/{message}/g,req.body.message).replace(/{email}/g,req.body.email)
				transporter.sendMail({
    			from: config.from,
				to: config.sendTo,
				subject: config.mailSubject,
				html: mailHtml,
				auth: {
					user: config.ourOfficialMail,
					refreshToken: config.refreshToken,
					accessToken: config.accessToken,
					expires: 1484314697598
				}
				}, (err, info) => {
    				if(!err){
    					res.status(200).json({message: 'The mail has been sent successfully, we will contact you as soon as we can :)'})
    				}else{
    					res.status(400).json('Something went wrong!!! Try Again!!')
    				}
				})
			})
		}
	})

module.exports = router

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
