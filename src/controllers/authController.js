const db = require('../database/models');
const generateToken = require('../controllers/jwtController');

const ValidateToken = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' })
  } if (!user) {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  const create = generateToken.createToken({ email, password })
  
  return res.status(200).json({ token: create });
}

module.exports = {
  ValidateToken,
}