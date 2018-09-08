module.exports = {
	css: { // 配置css模块
  	loaderOptions: { // 向预处理器 Loader 传递配置选项
    	less: { // 配置less（其他样式解析用法一致）
    		javascriptEnabled: true // 设置为true
    	}
  	}
	},
  devServer: {
    https: false,
    proxy: {
      '/ssss': {
        // 目标 API 地址
        target: 'http://localhost:8080',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      },
      '/admin': {
        target: 'https://devadmin.alphalawyer.cn',
        changeOrigin: true
      },
      '/im': {
        target: 'https://dev.alphalawyer.cn',
        changeOrigin: true
      },
      '/user': {
        target: 'https://dev.alphalawyer.cn',
        changeOrigin: true
      },
      '/common': {
        target: 'https://dev.alphalawyer.cn',
        changeOrigin: true
      },
      '/ilaw': {
        target: 'https://dev.alphalawyer.cn',
        changeOrigin: true
      }
    }
    // showEslintErrorsInOverlay: true
  }
}
