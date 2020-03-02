const address = require('address')
const util = require('../util/system')
const c = require('chalk')

const ip = async () => {
    const ip = address.ip();
    try {
        await util.clipAsync(ip);
        console.log(`\n- 当前 ${c.underline('IP')} 已复制\n- current ${c.underline('IP')} has been copied \n📞  ${c.green.bold(ip)}`);
    } catch (e) {
        console.log(e);
    }
}

module.exports = ip;