const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello from the server!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint ...');
});

app.listen(PORT, () => {
  console.log('App running on port 3000');
});
