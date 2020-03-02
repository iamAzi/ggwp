
/**
 * 类型判断函数
 * @param {Object} obj 需类型判断的对象
 */
const getType = (obj) => {
    let type = typeof obj;
    if (type != "object") {
        return type;
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}

module.exports = {
    getType
};