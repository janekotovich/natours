const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// console.log(app.get('env'));
// console.log(process.env);

app.listen(process.env.PORT, () => {
  console.log('App running on port 3000');
});
