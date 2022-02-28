
const path = require('path')
const fs = require('fs')
function resolve(dir) {
  // __dirname为当前js文件所在的系统绝对路径
  return path.resolve(__dirname, dir)
}
const join = path.join
function getEntries(path) {
  const fileNameArr = fs.readdirSync(resolve(path))
  const entries = fileNameArr.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(itemPath)
    }
    return ret
  }, {})
  return entries
}
const DEV_CONFIG = {
  pages: {
    index: {
      entry: 'examples/main.js'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages')
      }
    }
  }
}
const BUILD_CONFIG = {
  chainWebpack: config => {
    // 使/packages加入编译
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      // 删除默认生成的app.js
    // 删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来。
    // 删除copy，不要复制public文件夹内容到lib文件夹中。
    // 删除html，只打包组件，不生成html页面。
    // 删除preload以及prefetch，因为不生成html页面，所以这两个也没用。
    // 删除hmr，删除热更新。
    config.entryPoints.delete('app')
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
  },
  configureWebpack: {
    entry: { ...getEntries('packages') },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2'
    }
  },
  // 打包生成位置
  outputDir: 'lib',
  // 样式生成位置
  css: {
    extract: {
      filename: 'style/[name].css'
    }
  },
  // 生产环境下关闭sourcemap，既可以减少打包时间，又可以防止f12看到源码
  productionSourceMap: false
}
module.exports = process.env.NODE_ENV === 'development' ? DEV_CONFIG : BUILD_CONFIG
