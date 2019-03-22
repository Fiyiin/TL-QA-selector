/* eslint-disable import/prefer-default-export */
export const checkCreateTeam = (req, res, next) => {
  let foundError = false;
  const error = [];
  const trimValue = value => value.trim();
  const { teamName, members } = req.body;
  if (teamName === undefined || trimValue(teamName) === '') {
    foundError = true;
    error.push('team name is required');
  }
  if (members === undefined || !Array.isArray(members)) {
    foundError = true;
    error.push('member names should be in a valid format');
  } else {
    members.forEach((name) => {
      if (typeof (name) !== 'string' || trimValue(name) === '') {
        foundError = true;
        error.push('member names should be in as valid format');
      }
    });
  }

  if (foundError) {
    const ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }

  req.body.teamName = teamName.trim();
  req.body.members = members.map(trimValue);
  next();
};

export const checkTeam = (req, res, next) => {
  const error = [];
  let foundError = false;
  const trimValue = value => value.trim();
  const { teamName } = req.body;
  if (teamName === undefined || trimValue(teamName) === '') {
    foundError = true;
    error.push('team name is required');
  }
  if (foundError) {
    const ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }
  req.body.teamName = teamName.trim();
  next();
};
