'use strict';

/**
 * SQLite 模块
 * 
 * 创建连接池，提供数据库连接服务
 * 提供SQLite数据库服务连接, 表操作等功能
 * 
 * 下载地址：https://www.sqlite.org/download.html
 * 
 * 安装需求：
 * 1. (windows)安装Visual Studio 2020（或更高），确保选择C++桌面开发，Windows 10 SDK
 * 2. (linux)) 安装git工具  sudu yum install git
 * 3. npm install sqlite3 --msvs_version=2022
 * 
 * TODO 后续再优化，使用ORM框架: sequelize link: https://github.com/demopark/sequelize-docs-Zh-CN
 *
 * @module sqlite
 */


const sqlite3 = require('sqlite3').verbose();
const { createPool } = require('generic-pool');
const sLog = require('./sLog');

const Sqlite = {
    // 打印信息
    log: msg => console.log(msg),
    // 创建连接池
    init: async function (config) {
        this.poolQ = await this.createQPool(config);
    },
    // 创建连接池
    createQPool: async function (config) {
        this.config = config;
        return createPool({
            create: () => new Promise((resolve, reject) => {
                let db = new sqlite3.Database(config.database, (err) => {
                    if (err) {
                        sLog.error('Error connecting to SQLite:', err);
                        reject(err);
                    } else {
                        sLog.log('[√] Connected to SQLite');
                        resolve(db);
                    }
                });
            }),
            destroy: db => new Promise((resolve, reject) => {
                db.close((err) => {
                    if (err) {
                        sLog.error('Error closing SQLite:', err);
                        reject(err);
                    } else {
                        sLog.log('[√] Connection closed');
                        resolve();
                    }
                });
            })
        });
    },

    // 查询
    query: async function (sql, params) {
        if (!this.poolQ) {
            sLog.error('SQLite pool is not initialized');
            return;
        }

        let db = await this.poolQ.acquire();
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                // 执行SQL
                sLog.log(`执行SQL：${sql} 参数：${params}`);
                if (err) {
                    sLog.error('Error querying data:', err);
                    reject(err);
                } else {
                    sLog.log(`查询结果：${JSON.stringify(rows)} `);
                    resolve(rows);
                }
                // @ts-ignore
                this.poolQ.release(db);
            });
        });
    },

    // 使用回调方法处理数据
    queryCallback: async function (sql, params, callback) {
        if (!this.poolQ) {
            sLog.error('SQLite pool is not initialized');
            return;
        }
        let db = await this.poolQ.acquire();
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
            this.poolQ.release(db);
        });
    },

    // 插入数据
    insert: async function (sql, params) {
        if (!this.poolQ) {
            sLog.error('SQLite pool is not initialized');
            return;
        }
        let db = await this.poolQ.acquire();
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                sLog.log(`执行SQL：${sql} 参数：${params} `);
                if (err) {
                    sLog.error('Error inserting data:', err);
                    reject(err);
                } else {
                    console.log(`插入数据ID：${this.lastID} `);
                    resolve(this.lastID);
                }
                this.poolQ.release(db);

            });
        });
    },

    // 关闭连接
    closeQ: async () => {
        if (this.poolQ) {
            // @ts-ignore
            await this.poolQ.drain().then(() => this.poolQ.clear());
            sLog.log('[√] Connection closed');
        }
    }
}

module.exports = Sqlite;