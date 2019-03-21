import express from 'express';
import Team from './controller';

const Router = express.Router();

Router.post('/team', Team.createOffice);

export default Router;