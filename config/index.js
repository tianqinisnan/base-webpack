"use strict";
const path = require("path");
const ENV_PRE = "https://www.google.com";

module.exports = {
  // Config for local development environment
  dev: {
    // Paths
    assetsSubDirectory: "fe-static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: ENV_PRE,
        changeOrigin: true
        // pathRewrite: {"^/api/user/v1" : "/user/v1"}
      }
    },
    // Various Dev Server settings
    disableHostCheck: true,
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  // Config for test environment
  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../output/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../output"),
    assetsSubDirectory: "fe-static",
    assetsPublicPath: "/",
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // Config for online environment
  online: {
    // Template for index.html
    index: path.resolve(__dirname, "../output/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../output"),
    assetsSubDirectory: "fe-static",
    assetsPublicPath: "//cdn.google.com/assets/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
