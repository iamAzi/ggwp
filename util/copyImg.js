const { copyImg } = require('img-clipboard');

const copyImg = (imgPath) => {
    let _data = fs.readFileSync(imgPath);
    copyImg(Buffer.from(_data, 'base64'));
}

module.exports = copyImg;