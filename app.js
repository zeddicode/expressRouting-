import express from 'express'

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send('<h1>Our website is only available during working hours (Monday to Friday, from 9 to 17).</h1>');
  }
};

app.use(workingHoursMiddleware);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
