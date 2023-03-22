const http = require('http');
const router = require('./router');
const port = process.env.PORT || 4300;;
const hostName = 'localhost';
 const server = http.createServer(router);
server.listen(port , hostName , ()=>{
    console.log(`Server running at port http://${hostName}:${port}`);
} );