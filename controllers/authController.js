const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const User = require('../models/User');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).send('로그인 실패.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('로그인 실패..');
        }
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send('로그인 성공.');
    } catch (err) {
        res.status(500).send('에러 발생.');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send('로그아웃.');
};
