'use strict';

/**
 * RabiitMQ test
 * 
 * Test the rabbitmq module
 */

const { sLog, rabbitMq } = require('../index');

// 初始化rabbitmq配置
const config = {
    host: '121.24.193.184',
    port: 5672,
    username: 'fei05',
    password: 'fei05112323',
    queue: 'new-concept-55k'
}

describe('rabbitMq', () => {
    let ch;
    beforeAll(async () => {
        ch = await rabbitMq.init(config);
    });
    it('connect', () => {
        sLog.log(ch);
        // 关闭连接
        rabbitMq.close();
    });
});