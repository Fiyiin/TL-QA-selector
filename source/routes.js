import express from 'express';
import Team from './controller';
import { checkCreateTeam } from './validations';

const Router = express.Router();

Router.post('/team', checkCreateTeam, Team.createTeam);
Router.get('/generate/:teamName', Team.generate);

export default Router;
