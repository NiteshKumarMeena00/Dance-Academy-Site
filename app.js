const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8000;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);

app.use(express.urlencoded())
app.use('/static', express.static('static')) 

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to database")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});