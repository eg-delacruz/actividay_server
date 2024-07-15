import express from 'express';
const app = express();

import config from './config.js';
import http from 'http';

const server = http.createServer(app);

app.use(express.json());

//Activities data
import data from './data.js';

//CORS
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'https://actividay.vercel.app/',
];

app.get('/', (req, res) => {
  const origin = req.header('origin');
  console.log({ origin });

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  //Securing route with secret key
  const SECRET_KEY = process.env.SERVER_SECRET_KEY;

  if (req.headers.secret_key === SECRET_KEY) {
    const randomIndex = Math.floor(Math.random() * data.activities.length);
    res.status(200).json(data.activities[randomIndex]);
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
});

server.listen(config.port, () => {
  console.log(
    'La aplicación está escuchando en ' + config.host + ':' + config.port
  );
});
