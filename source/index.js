import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import '@babel/polyfill';


const PORT = process.env.PORT || 7000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log('Sever running');
});


export default app;