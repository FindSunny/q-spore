/**
 * 打印工具类
 * 
 * 重写console.log()和console.error() 使其前缀添加日期和时间
 */

const sLog = {

    /**
     * 日志log
     */
    log: (msg, ...params) => {
        const date = new Date().toLocaleString();
        console.log(`${date}[LOG] ${msg}`, params)
    },

    /**
     * 错误log
     */
    error: (msg, ...params) => {
        const date = new Date().toLocaleString();
        console.error(`${date}[ERROR] ${msg}`, params);
    }

}

module.exports = sLog;