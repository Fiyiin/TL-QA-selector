import Pool from '../db/connection';

class Team {
  static async createTeam(req, res) {
    const { teamName, members } = req.body;
    const result = await Pool.query('SELECT * FROM add_team($1, $2::jsonb)', [teamName, JSON.stringify(members)]);
    return res.status(201).json({
      status: 201,
      data: result,
    });
  }
}

export default Team;
