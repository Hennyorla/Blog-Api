const http = require('http')
const app = require('./app');
const httpServer = http.createServer(app);
const dbconnect = require('./utils/dbconfig');
const { PORT } = require('./config/index');

// start the server
const startServer = async () => {

    await dbconnect();
    
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();