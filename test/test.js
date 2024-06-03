const { Sqlite } = require('../index');


// 数据库配置
const config = {
    database: 'C:/Users/suojianfei/test.db'
};

const test = async function (config) {
    await Sqlite.init(config);
    await Sqlite.query('select * from test_log where id = ?', [2]);
    await Sqlite.closeQ();
};

(async () => {
    await test();
})();
