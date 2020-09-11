const functions = require('firebase-functions');
const express = require('express')
const cors =  require('cors');
const { response } = require('express');
const stripe = require('stripe')('sk_test_51HPvbFDAl1Ejfowu6HX8eTcM1KhBORSyko5cW6vN3GslTodOETwILjkvtj1kXqLugb9ezB88hiQXIOGhy1VSpG8E00aGhCfzSI')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//App config
const app = express();
//App Midleware
app.use(cors({origin:true}))
app.use(express.json())
//API Routes
app.get('/',(request,response)=>{
    response.status(200).send('hello')
})

app.post('/payments/create',async (req,res)=>{
    const total = req.query.total
    console.log('Payment Request Recived For',total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //subunits
        currency:"usd",
        description:"stripe integration testing"
    })

    res.status(201).send({
        clientSecret:paymentIntent.client_secret
    })
})

//Listen Command
exports.api = functions.https.onRequest(app)


