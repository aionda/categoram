import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

var CLIENT_ID = '';
var CLIENT_SECRET = '';
var code = '';
var accessToken = '';
var following_list;

Router.route('/', function() {
  this.response.writeHead(302, {
    'Location': 'https://api.instagram.com/oauth/authorize/?'
    	+ 'client_id=' + CLIENT_ID
    	+ '&redirect_uri=' + 'http://localhost:3000/callback' +
    	'&response_type=code&scope=follower_list' 
  });
  this.response.end();
}, {where: 'server'});

Router.route('/callback', function() {
  code = this.params.query.code
  var result = HTTP.post('https://api.instagram.com/oauth/access_token', {
    params: {
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'redirect_uri': 'http://localhost:3000/callback',
      'code': code
    } 
  });
	accessToken = result.data.access_token;
	this.response.writeHead(302, {
    'Location': '/home' 
  	});
	this.response.end();
}, {where: 'server'});

Router.route('/home', function() {
	console.log("accessToken" + accessToken);
	var url = 'https://api.instagram.com/v1/users/self/follows?access_token='
	+ accessToken;
	var following_list = HTTP.get(url);
}, {where: 'server'});










