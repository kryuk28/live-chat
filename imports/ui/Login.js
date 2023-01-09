import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import './Login.html';
import './SignUp.js';

Template.login.onCreated(function login() {
  this.state = new ReactiveDict();
  this.state.set('registered', true);
});

Template.login.helpers({
  registered() {
    console.log(Template.instance().state.get('registered'));
    return Template.instance().state.get('registered');
  },
});

Template.login.events({
  'submit .login-form'(event) {
    event.preventDefault();

    const {target} = event;
    console.log(target.username.value);
    console.log(target.password.value);

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword({username: username}, password);
  },
  'click #registered'(event) {
    event.preventDefault();
    Template.instance().state.set('registered', false);
  },
});
