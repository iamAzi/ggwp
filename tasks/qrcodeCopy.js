const fs = require('fs');
const path = require('path');
const c = require('chalk');

const { copyImg } = require('img-clipboard');
const QRCode = require('qrcode');

const qrcodeCopy = async (url) => {
    const temp = path.resolve(process.env.HOME, '.qrcode-temp.png')
    try {
        await QRCode.toFile(temp, url);
        let _data = fs.readFileSync(temp);
        await copyImg(Buffer.from(_data, 'base64'));
        fs.unlinkSync(temp);
        console.log(c.green.bold(`🔗  ${url} -> 对应二维码已复制到剪贴板，请直接前往聊天工具粘贴`));
      } catch (err) {
        // 处理错误
        console.log(err);
      }
}

module.exports = qrcodeCopy;
