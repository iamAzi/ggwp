const util = require('../util/system')
const c = require('chalk')

const task = async (time, time2) => {
    //! 没带参数，直接打印时间戳
    if (!time) {
        const _date = new Date().getTime();
        try {
            await util.clipAsync(_date);
            console.log(`\n- ${c.underline('当前时间戳')} 已复制\n- ${c.underline('current timestamp')} has been copied \n📆  ${c.green.bold(_date)}`);
        } catch (e) {
            console.log(e);
        }
    } else if ((/\d{4}([\.|\-|\/])\d{1,2}\1\d{1,2}$/).test(time)) {
        if (!(/\d{1,2}:\d{1,2}:\d{1,2}$/).test(time2)) {
            console.log(c.bgRed('请输入正确的时间格式'));
        }
        let _pre = time;
        let _stamp = '';
        if (time2) {
            _pre = `${time} ${time2}`;
            _stamp = new Date(_pre).getTime();
        } else {
            _stamp = new Date(time + ' 0:00:00').getTime();
        }
        try {
            await util.clipAsync(_stamp);
            console.log(`\n🤖  ${c.underline(_pre)} -> ${c.green.bold(_stamp)} 已复制`)
        } catch (e) {
            console.log(e);
        }
    } else if ((/\d{10}|\d{13}/.test(time))) {
        //! 输入的是时间戳，转化成时间
        const length = time.length;
        length === 10 && (time += '000');
        time = Number(time);
        const _date = new Date(time).toLocaleString('zh', { hour12: false });
        try {
            await util.clipAsync(_date);
            console.log(`\n🤖  ${c.underline(time)} -> ${c.green.bold(_date)} 已复制`)
        } catch (e) {
            console.log(e)
        }
    } else {
        console.log(c.bgRed('🚨  请输入正确的时间参数'));
    }
}

module.exports = task;