const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const db = require('../utils/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
            return res.status(401).send('Unauthorized');
        }
        const token = generateToken(results[0]);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
};
