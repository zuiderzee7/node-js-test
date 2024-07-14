const sequelize = require('../databases/mysql');

// db.js는 필요한 경우 추가적인 추상화를 제공.
// 예를 들어, 모델 초기화나 추가적인 설정 등을 여기서 처리 가능.

const initDB = async () => {
    try {
        await sequelize.sync({force: false});
        console.log('Database & tables created!');
    } catch (err) {
        console.error('Error creating database & tables:', err);
    }
};

module.exports = {
    sequelize,
    initDB
};
