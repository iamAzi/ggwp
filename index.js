#!/usr/bin/env node

const commander = require('commander')
const inquirer = require('inquirer')
const c = require('chalk')
const execa = require('execa')
const util = require('./util/system')

const task = require('./tasks/index.js');

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
