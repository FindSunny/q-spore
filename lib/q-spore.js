'use strict';

/**
 * Q-Spore 模块
 */
const Q = {

    // 打印信息
    log: function (msg) {
        console.log(msg);
    },
}

module.exports = Q;

// 兼容TypeScript
module.exports.default = Q;