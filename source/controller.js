import Pool from '../db/connection';

const removeQuotes = (rows) => {
  rows.forEach((row) => {
    row.name = row.name.replace(/"/g, '');
  });
  return rows;
};

class Team {
  static async createTeam(req, res) {
    const { teamName, members } = req.body;
    try {
      const result = await Pool.query('SELECT * FROM add_team($1, $2::jsonb)', [teamName, JSON.stringify(members)]);
      return res.status(201).json({
        status: 201,
        data: result,
      });
    } catch (err) {
      if (err.code == 23505) {
        return res.status(409).json({
          status: 409,
          error: 'this team name already exist',
        });
      }
    }
  }

  static async generate(req, res) {
    const { teamName } = req.params;
    const { rowCount, rows } = await Pool.query('SELECT * FROM generate_team($1)', [teamName]);
    if (rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: removeQuotes(rows),
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'no such team exists',
      });
    }
  }
}

export default Team;
