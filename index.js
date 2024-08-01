const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const { generateApiKey, messages } = require('./messages');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
const port = process.env.PORT || 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));// app/set('views' , '/views')
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { messages });
});

app.post('/push', (req, res) => {
  const { message } = req.body;
  if (message) {
    messages.push({ id: generateApiKey(), text: message, date: new Date() });
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const messageIndex = messages.findIndex(msg => msg.id === id);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
