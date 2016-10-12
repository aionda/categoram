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

	function htmlbodyHeightUpdate(){
		var height3 = $( window ).height()
		var height1 = $('.nav').height()+50
		height2 = $('.main').height()
		if(height2 > height3){
			$('html').height(Math.max(height1,height3,height2)+10);
			$('body').height(Math.max(height1,height3,height2)+10);
		}
		else
		{
			$('html').height(Math.max(height1,height3,height2));
			$('body').height(Math.max(height1,height3,height2));
		}	
	}
	
	$(document).ready(function () {
		htmlbodyHeightUpdate()
		$( window ).resize(function() {
			htmlbodyHeightUpdate()
		});
		$( window ).scroll(function() {
			height2 = $('.main').height()
  			htmlbodyHeightUpdate()
		});
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

