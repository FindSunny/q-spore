/**
 * sqlite 模块 测试类
 * 
 * 测试sqlite模块的功能
 */

const { sLog, Sqlite } = require('../index');

// 数据库配置
const config = {
    database: 'C:/Users/suojianfei/test.db'
};

describe('sqlite', () => {
    it('query', async () => {
        await Sqlite.init(config);
        await Sqlite.query('select * from test_log where id = ?', [2]);
        await Sqlite.closeQ();
    });
});