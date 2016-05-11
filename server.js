/**
 * Created by zhongyufei on 2016/5/11.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        res.end('404')
    }else{
        var pathname = path.join(__dirname,req.url);
        fs.stat(pathname,function(err,stats){
            console.log(pathname,stats);
            if(stats.isDirectory()){
                res.end("It's a Directory")
            }else if(stats.isFile()){
                fs.createReadStream(pathname).pipe(res);
            }
        });
    }
}
).listen(3000);
console.log('server start at port:3000...');