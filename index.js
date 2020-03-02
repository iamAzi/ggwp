#!/usr/bin/env node

const commander = require('commander')
const c = require('chalk')
const execa = require('execa')
const task = require('./tasks/index.js');
const fs = require('fs');
const path = require('path')
var QRCode = require('qrcode')



commander.version('1.0.1', '-v, --version', 'output the current version');

commander
    .command('time [t1] [t2]')
    .alias('t')
    .description('当前时间戳： gg t；\n时间戳转日期： gg t <时间戳>；\n日期转时间戳： gg t <日期>[时间]')
    .action(async (t1, t2) => {
        task.time(t1, t2)
    });

commander
    .command('ip')
    .description('获取当前IP地址，并粘贴到剪贴板')
    .action(() => {
        task.ip();
    });

commander
    .command('reg')
    .description('正则表达式速查表')
    .action(() => {
        const rules = require('./docs/regex')
        console.log(rules);
    })

commander
    .command('img <url>')
    .usage("--quality 50 --size 100x100 ")
    .option('-q, --quality <quality>')
    .option('-s, --size <size>')
    .action((url, options) => {
        task.img(url, {
            quality: options.quality || '',
            size: options.size || ''
        })
    })

commander
    .command('qr <url>')
    .action((url) => {
        task.qrcodeCopy(url);
    })

commander
    .command('dev')
    .description('在本地进入开发目录')
    .action(async () => {
        try {
            const cmd = `code /Users/wangze/Desktop/MyProjects/effi-tools`
            console.log(cmd);
            execa.node(cmd);
        } catch (e) {
            console.log(e);
        }
    });

commander.parse(process.argv)
