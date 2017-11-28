var http=require('http')
http.createServer(function(req,res){
    var html="Hello Nodejs!"
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write(html)
    res.end()
}).listen(1337,'127.0.0.1')
console.log('Server running at http://127.0.0.1:1337/')


