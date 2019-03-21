import Pool from '../db/connection';

class Team {
  static async createTeam(req, res) {
    const { teamName } = req.body;
    const { rowCount } = await Pool.query('INSERT INTO team ("name") VALUES ($1) RETURNING *', [teamName]);
    if (rowCount > 0) {
      res.status(201).json({
        status: 201,
        message: 'Team created',
      });
    } else {
      res.status(409).json({
        status: 409,
        error: 'Team already exists',
      });
    }
  }
}

export default Team;
