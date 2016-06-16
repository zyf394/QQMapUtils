/**
 * Created by zhongyufei on 2016/5/11.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        res.end('404')
    }else if(req.url == '/'){
        var indexHtml = path.join(__dirname,'test','index.html');
        console.log(indexHtml);
        fs.createReadStream(indexHtml).pipe(res);

    }else{
        var pathname = path.join(__dirname,req.url);
        fs.stat(pathname,function(err,stats){
            if(!stats) {
                res.end("404");
                return;
            }

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