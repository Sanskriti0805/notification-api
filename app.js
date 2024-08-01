const express = require ('express');
const bodyparser = require ('body-parser');
const dotenv = require ('dotenv');
const { generateApiKey, messages } = require ('./messages');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
export default app;

 