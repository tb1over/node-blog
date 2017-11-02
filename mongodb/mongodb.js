'use strict';
var mongoose = require('mongoose')
var config = require('../config')
mongoose.connect(config.mongodb, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.once('open', function () {
  console.log("数据库链接成功了！")
})

db.on('error', function (error) {
  console.log('链接数据库时出错了！' + error)
  mongoose.disconnect();
})

db.on('close', function () {
  console.log('数据库断开，重新连接数据库')
  mongoose.connect(config.mongodb, {
    useMongoClient: true
  });
})

module.exports = mongoose