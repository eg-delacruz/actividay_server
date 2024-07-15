import express from 'express';
import cors from 'cors';

const app = express();

import config from './config.js';
import http from 'http';

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

//Activities data
import data from './data.js';

//CORS
const ACCEPTED_ORIGINS = [
  'https://actividay.vercel.app/, http://localhost:3000/',
];

app.get('/', (req, res) => {
  //CORS
  const origin = req.headers;
  console.log('Request from: ', origin);

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  //Securing route with secret key
  const SECRET_KEY = process.env.SERVER_SECRET_KEY;

  if (req.headers.secret_key === SECRET_KEY) {
    const randomIndex = Math.floor(Math.random() * data.activities.length);
    //Return an object that can be seen in the browser
    res.send(data.activities[randomIndex]);
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
});

server.listen(config.port, () => {
  console.log(
    'La aplicación está escuchando en ' + config.host + ':' + config.port
  );
});
