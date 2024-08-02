const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const { generateApiKey, messages } = require('./messages');
const cors = require('cors')
const mongoose = require("mongoose")
const main = require("./config/connetDB.js");
const Message = require('./models/mesagesModel.js');
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
  origin: '*',
  credentials: true
}))
const port = process.env.PORT || 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async(req, res) => {
  const messages = await Message.find();
  res.render('index', { messages });
});

app.post('/push', async (req, res) => {
  const { message } = req.body;
  console.log(message)

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const payload = {
    message: message
  };

  try {
    const pushMessage = new Message(payload);
    const savedMessage = await pushMessage.save();

    console.log(savedMessage);

    // window.location.href = '/';

    // return res.status(201).json({
    //   message: savedMessage.message, 
    //   date: savedMessage.date,
    //   time: savedMessage.time
    // });

    res.redirect('/')
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/delete/:id', async (req, res) => {
  const { id } = req.params

  const deleteMessage = await Message.findByIdAndDelete(id)

  // window.location.href = '/';
  // return res.status(200).json({
  //   message: 'deleted succesfully',
  //   data: deleteMessage
  // })

  res.redirect('/')

});

app.get('/messages', async (req, res) => {

  const messages = await Message.find()

  return res.status(200).json({
    messages: messages
  })
})

main().then(() => {
  app.listen(port, () => {
    console.log('server started at ' + port)
  })
})



module.exports = app;
