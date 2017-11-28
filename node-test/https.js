//模拟搭建https服务器
var https = require('https')
var fs = require('fs')    //引入文件系统模块

var options = {
    key:fs.readFileSync('ssh_key.pem'),   //同步的读出SSL证书  私钥文件
    cert: fs.readFileSync('ssh_cert.pem')   //cert是证书文件
}   

https.createServer(options,function(req,res){
    res.writeHead(200)
    res.end('Hello Https')
})
.listen(8090)