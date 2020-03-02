const path = require('path');
const Jimp = require('jimp')

/**
 * 图片压缩函数
 * @param {string} imgPath 图片地址
 * @param {object} option 图片压缩设置，包含quality，size两个参数
 */
const imgProcess = (imgPath, option) => {
    option = option || {};
    Jimp.read(imgPath)
        .then(lenna => {
            const {
                size,
                quality
            } = option;
            console.log(option);
            const _arr = size.split('x');
            let width, height;
            if (_arr && _arr.length === 2) {
                width = Number(_arr[0]);
                height = Number(_arr[1]);
            }
            if (width && height) {
                lenna.resize(width, height);
            }
            if (quality) {
                lenna.quality(Number(quality));
            }
            lenna.write(path.dirname(imgPath) + '/' + path.basename(imgPath) + '-processed.jpg'); // save
})
        .catch (err => {
    console.error(err);
});
}

module.exports = imgProcess;