const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleweare!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  // if (req.params.id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
      if (err) console.log(`Here is an ${err}`);
    }
  );
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here ...>' } });
};
const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(204).json({ status: 'success', data: null });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log('App running on port 3000');
});
