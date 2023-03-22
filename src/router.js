const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');
const router = (req ,res)=>{
    if (req.url === '/') {
        const filePath =path.join(__dirname, '..','public','index.html') ;
        fs.readFile(filePath, 'utf8', (err, file) => {
          if (err) {
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('server error');
          } else {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(file);
          }
        });
    }else if(req.url==='/style/style1.css'){
        const filePath = path.join(__dirname, '..','public','style' , 'style1.css') ;
        fs.readFile(filePath, 'utf8' , (err,file)=>{
            if(err){
                res.writeHead(500, {'content-type' : 'text/plain'});
                res.end('Server error')
            }else{
                res.writeHead(200,{'content-type' : 'text/css'});
                res.end(file)
            }
        });
    }else if(req.url==='/script/script1.js'){
        const filePath = path.join(__dirname, '..','public', 'script' , 'script1.js') ;
        fs.readFile(filePath, 'utf8' , (err,file)=>{
            if(err){
                res.writeHead(500, {'content-type' : 'text/plain'});
                res.end('Server error')
            }else{
                res.writeHead(200,{'content-type' : 'text/javascript'});
                res.end(file)
            }
        });
    }else if(req.url==='/script/request.js'){
        const filePath =path.join(__dirname,'..'  ,'public' , 'script' , 'request.js') ;
        fs.readFile(filePath, 'utf8' , (err,file)=>{
            if(err){
                res.writeHead(500, {'content-type' : 'text/plain'});
                res.end('Server error')
            }else{
                res.writeHead(200,{'content-type' : 'text/javascript'});
                res.end(file)
            }
        });
    }else if(req.url.includes('/autocomplete')){
        let wordFile = path.join(__dirname, '..', 'word.txt');
        const query = req.url.split('?term=')[1]
        fs.readFile(wordFile, 'utf8' ,(err,data)=>{
            if(err){
                res.statusCode = 500
                res.end('Server Error')
                return;
            }
            const wordsData = data.toString().split('\n')
            const match = wordsData.filter((word)=> word.startsWith(query))
            res.writeHead(200)
            res.end(JSON.stringify(match))
        })
    }
}
module.exports = router;