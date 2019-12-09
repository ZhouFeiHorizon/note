#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs')
var path = require('path')
var commit = process.argv[2] || ''
console.log(process.argv);

console.log(' process.cwd(): ', process.cwd()) // 获取node命令启动路径，你在那个目录运行的其值就是谁
console.log(' __dirname: ', __dirname)  // 文件所在目录
console.log(' process.execPath: ', process.execPath)  // 执行此js脚本所用的nodejs程序文件路径

const reslove = file => {
  return path.join(__dirname, file)
}
var styles = {
  'bold': '\x1B[1m%s\x1B[22m',
  'italic': '\x1B[3m%s\x1B[23m',
  'underline': '\x1B[4m%s\x1B[24m',
  'inverse': '\x1B[7m%s\x1B[27m',
  'strikethrough': '\x1B[9m%s\x1B[29m',
  'white': '\x1B[37m%s\x1B[39m',
  'grey': '\x1B[90m%s\x1B[39m',
  'black': '\x1B[30m%s\x1B[39m',
  'blue': '\x1B[34m%s\x1B[39m',
  'cyan': '\x1B[36m%s\x1B[39m',
  'green': '\x1B[32m%s\x1B[39m',
  'magenta': '\x1B[35m%s\x1B[39m',
  'red': '\x1B[31m%s\x1B[39m',
  'yellow': '\x1B[33m%s\x1B[39m',
  'whiteBG': '\x1B[47m%s\x1B[49m',
  'greyBG': '\x1B[49;5;8m%s\x1B[49m',
  'blackBG': '\x1B[40m%s\x1B[49m',
  'blueBG': '\x1B[44m%s\x1B[49m',
  'cyanBG': '\x1B[46m%s\x1B[49m',
  'greenBG': '\x1B[42m%s\x1B[49m',
  'magentaBG': '\x1B[45m%s\x1B[49m',
  'redBG': '\x1B[41m%s\x1B[49m',
  'yellowBG': '\x1B[43m%s\x1B[49m'
};

const cmd = {
  exec: (command, pause) => {
    return new Promise((reslove, reject) => {
      if (!pause) {
        console.log(styles.magentaBG, '$ ' + command)
      }
      exec(command, { encoding: 'utf-8' }, (err, stdout, stderr) => {
        if (err) {
          console.error(styles.red, err)
          reject(err)
        } else {
          console.log(styles.green, stdout)
          reslove(stdout)
        }
      })
    })
  }
}

var works = [
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六'
]

var d = new Date()
var work = '星期' + works[d.getDay()]
var date = d.toLocaleString()

// var ora = require('ora')

var content = `${commit} ${date}  ${work}`.trim()


// var create = file => {
//   var varsPath = reslove('vue.vue')
//   fs.writeFileSync(path.join('./index.vue'), fs.readFileSync(varsPath), 'utf-8')
// }

// create()
cmd.exec(`git pull`)
  .then(() => cmd.exec(`git add . && git commit -m "${content}"`))
  .then(() => cmd.exec(`git push --all`))
  .then(() => {
    console.log(styles.greenBG, 'DONE')
    return true
  })
  .then(() => cmd.exec(`pause`, true))
  .catch(() => { })
