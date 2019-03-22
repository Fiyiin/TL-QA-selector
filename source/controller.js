import Pool from '../db/connection';

class Team {
  static async createTeam(req, res) {
    const { teamName, members } = req.body;
    try {
      const result = await Pool.query('SELECT * FROM add_team($1, $2::jsonb)', [teamName, JSON.stringify(members)]);
      return res.status(201).json({
        status: 201,
        data: result,
      });
    } catch(err) {
      if (err.code == 23505) {
        return res.status(409).json({
          status: 409,
          error: 'this team name already exist',
        });
      } 
    }
  }
}

export default Team;
