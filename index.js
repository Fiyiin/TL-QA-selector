import express from 'express';
import bodyparser from 'body-parser';
import Pool from './db/connection';
import '@babel/polyfill';

const port = 3000;

const app = express();
app.use(bodyparser.json());

app.post('/team', async (req, res) => {
  const { teamName, members } = req.body;
  const result = await Pool.query('SELECT * FROM add_team($1, $2::jsonb)', [teamName, JSON.stringify(members)]);
  res.status(200).send('successful');
  console.log(result);
});

app.listen(port, () => console.log(`app running on port ${port}`));

export default app;
