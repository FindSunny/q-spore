'use strict';

/**
 * SQLite 模块
 * 
 * 创建连接池，提供数据库连接服务
 * 提供SQLite数据库服务连接, 表操作等功能
 * 
 * 下载地址：https://www.sqlite.org/download.html
 *
 * @module sqlite
 */


const sqlite3 = require('sqlite3').verbose();
const { createPool } = require('generic-pool');
const sLog = require('./sLog');

const sqlite = {
    // 打印信息
    log: msg => console.log(msg),
    // 创建连接池
    createPool: function (config) {
        return createPool({
            create: () => new Promise((resolve, reject) => {
                let db = new sqlite3.Database(config.database, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(db);
                    }
                });
            }),
            destroy: db => new Promise((resolve, reject) => {
                db.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        });
    },

    // 查询
    query: async (pool, sql, params) => {
        let db = await pool.acquire();
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                pool.release(db);
            });
        });
    },

    // 使用回调方法处理数据
    queryCallback: async (pool, sql, params, callback) => {
        let db = await pool.acquire();
        db.all(sql, params, (err, rows) => {
            callback(err, rows);
            pool.release(db);
        });
    },

    // 插入数据
    insert: async (pool, sql, params) => {
        let db = await pool.acquire();
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
                pool.release(db);
            });
        });
    }
}

module.exports = sqlite;