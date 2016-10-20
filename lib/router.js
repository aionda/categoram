Router.configure({
  layoutTemplate:'layout',
  yieldTemplates:{
  //each yield going to different templates
  'accounts':{to:'accounts'},
  'categories':{to:'categories'}
  }
});
Router.map(function(){
    this.route('/','layout');
    this.route('accounts', {
        layoutTemplate:'layout',
        path:'/:name',
        data: function() {
            console.log(this.params.name);
            Session.set('category',this.params.name);
        },
        template:'layout'
    });
});