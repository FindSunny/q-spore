/**
 * sqlite 模块 测试类
 * 
 * 测试sqlite模块的功能
 */

const { sLog, Sqlite } = require('../index');

// 数据库配置
const config = {
    database: 'C:\Users\suojianfei\test.db'
};

describe('sqlite', () => {
    let pool;
    beforeAll(() => {
        pool = Sqlite.createPool({
            database: config.database
        });
    });

    afterAll(() => {
        pool.drain().then(() => pool.clear());
    });

    it('query', async () => {
        let rows = await Sqlite.query(pool, 'select * from test_log');
        sLog.log(rows);
    });
});