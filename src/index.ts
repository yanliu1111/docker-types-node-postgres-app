import express from 'express';
import morgan from 'morgan';
import db from './modules/db';

const app = express();
app.use(morgan('dev'));
//morgan('dev') is a middleware function that logs the request details to the console.

app.get('/', async (req, res) => {
  const posts = await db.post.findMany();
  res.json(posts);
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
//interesting oddity of Docker which is you need to run thing not on localhost but on 0.0.0.0, so add the second argument there (host argument). It is specific to Docker containers, not to Node.js or Express.
