const mongoose = require('mongoose');

const dbURI = 'mongodb://ds055980.mlab.com:55980/social_network_db';
//mongodb://<dbuser>:<dbpassword>@ds055980.mlab.com:55980/social_network_db
var dbOptions = {
	user: 'dmitriydgit',
	pass: '4580510Dim',
	useNewUrlParser: true
}

mongoose.connect(dbURI, dbOptions);
mongoose.connection.on('connected', () => {
	console.log("Mongoose connected to : " + dbURI);
});
mongoose.connection.on('error', () => {
	console.log("Mongoose connection error : " + dbURI);
})

module.exports = mongoose;

//mongo ds055980.mlab.com:55980/social_network_db -u dmitriydgit -p 4580510Dim
