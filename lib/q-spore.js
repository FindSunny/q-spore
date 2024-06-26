'use strict';

/**
 * Q-Spore 模块
 */
const Q = {

    // 打印信息
    log: function (msg) {
        console.log(msg);
    },

    // 类型常量
    get TYPE() {
        return {
            // 新概念
            NEW_CONCEPT: 1,
            // 同花顺红字新闻
            THS_RED_NEWS: 2,
            // 韭菜公社
            JCGS: 3,
            // 公众号 mp.weixin.qq.com
            MP_WEIXIN: 4,
            // 知识星球
            ZSXQ: 5,
            // 微博段子
            WEIBO: 6,
            // 推特
            TWITTER: 7,
            // 董秘
            DONGMI: 8,
            // 谷歌百度搜索新闻
            GOOGLE_BAIDU_NEWS: 80,
            // 雪球红字新闻
            XQ_RED_NEWS: 81,
            // 涨停板
            ZTB: 82,
        };
    },

    // 来源常量
    get SOURCE() {
        return {
            // 同花顺
            THS: 1,
            // 开盘啦
            KPL: 2
        }
    }
}

module.exports = Q;

// 兼容TypeScript
module.exports.default = Q;