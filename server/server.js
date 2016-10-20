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
