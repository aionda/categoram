import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

FollowingAccounts = new Mongo.Collection('following_accounts');
Session.setDefault('loading', false);

Template.home.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var loadHandle = self.subscribe('loadFollowing');
		Session.set('loading', !loadHandle.ready());
	});
});

Router.route('/home', function () {
  this.render('home');
});

Template.home.helpers({
	accounts: function(){
		return FollowingAccounts.find();
	},

	loading: function(){
		return Session.get('loading');
	}
});

