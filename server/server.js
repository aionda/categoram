Meteor.startup(() => {
  if(Accounts.find().count() === 0) {
  	//Accounts
  }

  if(Categories.find().count() === 0) {
    // Categories
    Categories.insert({name:'fashion'});
    Categories.insert({name:'travel'});
    Categories.insert({name:'food'});
    Categories.insert({name:'celebrities'});
  }
});

Meteor.publish('categories', function() {
  return Categories.find(); 
});

Meteor.publish('accounts', function() {
  var self = this;
  var token = Meteor.users.findOne({_id:this.userId}).services.instagram.accessToken;
  var url = "https://api.instagram.com/v1/users/self/follows?access_token="
  + token;
  var response = HTTP.get(url);
  _.each(response.data.data, function(account) {
    var data = {
      username: account.username,
      full_name: account.full_name,
      profile_pic: account.profile_picture,
    }
    self.added('accounts', account.id, data);
  });

  self.ready();
});