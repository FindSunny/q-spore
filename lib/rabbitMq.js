'use strict';

/**
 * RabbitMQ 模块
 * 
 * 含有RabbitMQ队列服务生产,消费等功能
 * 
 * @module rabbitMq
 */


const amqp = require('amqplib');
const Joi = require('joi');
const sLog = require('./sLog');

const defaultConfig = {
    host: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    queue: 'task_queue'
};

const schema = Joi.object().keys({
    host: Joi.string().default(defaultConfig.host),
    port: Joi.number().default(defaultConfig.port),
    username: Joi.string().default(defaultConfig.username),
    password: Joi.string().default(defaultConfig.password),
    queue: Joi.string().default(defaultConfig.queue)
});

const RabbitMq = {
    // 打印信息
    log: msg => sLog.log(msg),

    // 初始化连接
    init: async ({ host, port, username, password, queue }) => {
        try {
            // 保存配置
            const { error, value: config } = schema.validate({ host, port, username, password, queue });

            if (error) {
                sLog.error('Invalid config:', error.details);
                return;
            }

            this.config = config;

            // 创建连接
            this.conn = await amqp.connect(`amqp://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}`);
            sLog.log('[√] Connected to RabbitMQ');
            // 创建通道
            this.ch = await this.conn.createChannel();
            sLog.log('[√] Created Channel');

            // 连接队列
            await this.ch.assertQueue(this.config.queue, { durable: true });
            sLog.log('[√] Connected to Queue');
            // 反馈初始化结果
            return this.ch;
        } catch (error) {
            sLog.error('[x] RabbitMQ Init Error:', error);
            if (this.conn) {
                this.conn.close();
            }
        }
    },

    // 关闭连接
    close: async () => {
        if (this.conn) {
            await this.conn.close();
            sLog.log('[√] Connection closed');
        }
    },

    // 发送消息
    send: async (msg) => {
        if (!this.config || !this.ch) {
            sLog.log('[x] Channel not created');
            return;
        }
        sLog.log(`[√] Start Sent ${msg}`);
        this.ch.sendToQueue(this.config.queue, Buffer.from(msg), { persistent: true });
        sLog.log(`[√] Sent Successfully`);
    },

}

module.exports = RabbitMq;