'use strict'
require('./check-versions')()

let node_args = process.argv.splice(2)
if (node_args && node_args[0] === 'prerls') {
  process.env.NODE_ENV = 'prerls'
} else if (node_args && node_args[0] === 'release') {
  process.env.NODE_ENV = 'release'
} else if (node_args && node_args[0] === 'dev1') {
  process.env.NODE_ENV = 'dev1'
} else if (node_args && node_args[0] === 'dev2') {
  process.env.NODE_ENV = 'dev2'
} else if (node_args && node_args[0] === 'dev3') {
  process.env.NODE_ENV = 'dev3'
} else {
  process.env.NODE_ENV = 'production'
}

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
