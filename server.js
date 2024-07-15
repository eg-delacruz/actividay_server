import express from 'express';
import config from './config.js';
import http from 'http';
import cors from 'cors';

//Activities data
import data from './data.js';
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

//CORS
const corsOptions = {
  origin: ['https://actividay.vercel.app/, http://localhost:3000/'],
  optionsSuccessStatus: 200,
};

app.get('/', cors(corsOptions), (req, res) => {
  //Securing route with secret key
  const SECRET_KEY = process.env.SERVER_SECRET_KEY;

  if (req.headers.secret_key === SECRET_KEY) {
    const randomIndex = Math.floor(Math.random() * data.activities.length);
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
