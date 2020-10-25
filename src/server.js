import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

import routes from './routes.js';
import apiRoutes from "./api/apiRoutes.js";

import GlobalData from './GlobalData.js';
import { joinGameRoom, playPoints, sendMessage } from './socket.js';

global.data = new GlobalData();

const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/api',apiRoutes);
app.use('/',routes);

io.on('connection', function(socket){
	console.log("socket has connected");

	socket.on("joinGameRoom", joinGameRoom.bind(this,io,socket));
	socket.on("playPoints", playPoints.bind(this,io,socket));
	socket.on("sendMessage",sendMessage.bind(this,io,socket));
});

// global.data.mongoDB.connect().catch(function(err){
	// console.log("Failed to connect to database with error:", err);
// }).finally(function(){
	server.listen(PORT, () => {
		console.log('Example app listening on port ${ PORT }!');
	});	
// });

