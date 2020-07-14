import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import routes from './routes.js';
import apiRoutes from "./api/apiRoutes.js";
import path from 'path';
import GlobalData from './GlobalData.js';

global.data = new GlobalData();

const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = socketio(server);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api',apiRoutes);
app.use('/',routes);

io.on('connection', function(socket){
	console.log("socket has connected");
});

global.data.mongoDB.connect().catch(function(err){
	console.log("Failed to connect to database with error:", err);
}).finally(function(){
	server.listen(8000, () => {
		console.log('Example app listening on port 8000!');
	});	
});

