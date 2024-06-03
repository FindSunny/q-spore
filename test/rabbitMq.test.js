'use strict';

/**
 * RabiitMQ test
 * 
 * Test the rabbitmq module
 */

const { sLog, RabbitMq } = require('../index');

// 初始化rabbitmq配置
const config = {
    host: '121.24.193.184',
    port: 5672,
    username: 'fei125',
    password: 'fei25123',
    queue: 'test_queue'
}

describe('rabbitMq', () => {
    let ch;
    beforeAll(async () => {
        ch = await RabbitMq.init(config);
    });
    it('connect', () => {
        sLog.log(ch);
    });
    it('send', async () => {
        await RabbitMq.send('Hello World!');
        // 关闭连接
        await RabbitMq.close();
    });

});