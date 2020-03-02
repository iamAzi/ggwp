#!/usr/bin/env node

const commander = require('commander')
const inquirer = require('inquirer')
const c = require('chalk')
const address = require('address')
const execa = require('execa')
const util = require('./util/system')

commander
    .command('time')
    .alias('t')
    .description('获取当前时间戳，并粘贴到剪贴板')
    .action(async () => {
        const date = new Date().getTime();
        try {
            await util.clipAsync(date);
            console.log(`\n- ${c.underline('当前时间戳')} 已复制\n- ${c.underline('current timestamp')} has been copied \n📆  ${c.green.bold(date)}`);
        } catch (e) {
            console.log(e);
        }
    });

commander
    .command('ip')
    .description('获取当前IP地址，并粘贴到剪贴板')
    .action(async () => {
        const ip = address.ip();
        try {
            await util.clipAsync(ip);
            console.log(`\n- 当前 ${c.underline('IP')} 已复制\n- current ${c.underline('IP')} has been copied \n📞  ${c.green.bold(ip)}`);
        } catch (e) {
            console.log(e);
        }
    });

commander
    .command('date [date]')
    .description('将输入时间戳转换为日期')
    .action((date) => {
        if (!(/\d*/).test(date)) {
            console.log(c.bgRed('🚨  请输入正确的时间戳'));
            return;
        };
        const length = date.length;
        if (length !== 10 && length !== 13) {
            console.log(c.bgRed('🚨  时间戳长度应为10或13位'));
            return;
        };
        length === 10 && (date += '000');
        date = Number(date);
        const res = new Date(date);

        console.log(`\n🤖  ${c.underline(date)} -> ${res.toLocaleString('zh', { hour12: false })}`)
    })

commander
    .command('reg')
    .description('正则表达式速查表')
    .action(() => {
        const rules = require('./docs/regex')

        console.log(rules);
    })

commander
    .command('dev')
    .description('进入开发目录')
    .action(async () => {
        try {
            const cmd = `code ${__dirname}`
            console.log(cmd);
            execa.node(cmd);
        } catch (e) {
            console.log(e);
        }
    });

commander.parse(process.argv)
