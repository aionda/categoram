import { Meteor } from 'meteor/meteor';

var CLIENT_ID = '';
var CLIENT_SECRET = '';
var code = '';
var accessToken = '';

Meteor.methods({
	'getToken':function(){
		return accessToken;
	}
});

Meteor.startup(() => {
  // code to run on server at startup
  Token = new Mongo.Collection('token');
});

Router.route('/', function() {
  this.response.writeHead(302, {
    'Location': 'https://api.instagram.com/oauth/authorize/?'
    	+ 'client_id=' + CLIENT_ID
    	+ '&redirect_uri=' + 'http://localhost:3000/callback' +
    	'&response_type=code&scope=follower_list+public_content' 
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
 	if(Token.find().count() == 0){
	  	var user_data = {
	  			'code':code,
	  			'token':result.data.access_token
	  			};
		Token.insert(user_data);
	}
	// accessToken = result.data.access_token;
	this.response.writeHead(302, {
	'Location': '/home' 
		});
	this.response.end();
}, {where: 'server'});

Meteor.publish('loadFollowing', function() {
	var self = this;
	try {
		accessToken = Token.findOne()["token"];
		console.log("accessToken: " + accessToken);

		var url = 'https://api.instagram.com/v1/users/self/follows?access_token='
		+ accessToken;
		var response = HTTP.get(url);

		_.each(response.data.data, function(item){
			var account = {
				id: item.id,
				username: item.username,
				full_name: item.full_name,
				profile_picture: item.profile_picture
			};

			self.added('following_accounts', Random.id(), account);
		});
		self.ready();
	} catch(error) {
		console.log(error);
	}
});




