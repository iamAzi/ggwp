const clip = require('clipboardy')
const chalk = require('chalk')
const gmUtil = require('./jsType')

const clipAsync = async (_target) => {
    let _t = _target;
    const _type = gmUtil.getType(_t);
    if (_type !== 'string' && _type !== 'number') {
        throw new Error(chalk.bgRed('🚨 复制对象应该为数字或字符串'))
    } else if (_type === 'number') {
        _t = String(_t);
    }
    await clip.write(_t);
    await clip.read();
}

module.exports = {
    clipAsync
}