// connect to database
require('./db');

var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var messages = {};

var MessageSchema = new mongoose.Schema({
	text: String,
  	user: String,
  	reported: {type: Boolean, default: false},
  	date: { type: Date, default: Date.now }
});

var MessageModel = mongoose.model('messages', MessageSchema);

messages.saveMessage = function(data) {
	var message = new MessageModel(
	{
		text: data.text,
		user: data.user
	})
	message.save();
};

messages.getReportedMessages = function(callback) {
	var param = {reported: true};
	MessageModel.find(param, function(err, data) {
		console.log(data);
		callback(data);
	});
}

messages.report = function(user, text, callback) {
	var param = {text: text, user: user}
	MessageModel.update(param, {
		reported: true
	}, function(){
		callback();
	});
}

messages.free = function(user, text, callback) {
	var param = {text: text}; //, user: user}
	MessageModel.update(param, {
		reported: false
	}, function(){
		callback();
	});
}

messages.delete = function(user, text, callback) {
	//all distasteful messages regardless of user should be deleted
	var param = {text: text};//, user: user};
	MessageModel.remove(param, function(){
		callback();
	});
}

messages.next = function(id, volume, callback) {
	var param = id != "" ? {_id:{"$lt": mongoose.Types.ObjectId(id)}} : null;
	var promise = MessageModel.find(param).limit(parseInt(volume)).sort({"_id":-1}); 
	promise.then(function(data){
		callback(data);
	})
}

module.exports = messages;
