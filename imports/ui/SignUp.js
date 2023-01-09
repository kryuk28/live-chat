import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import './SignUp.html';

Template.signup.onCreated(function signup() {
  this.state = new ReactiveDict();
  this.state.set('registered', true);
});

Template.signup.helpers({
  registered() {
    console.log(Template.instance().state.get('registered'));
    return Template.instance().state.get('registered');
  },
});

Template.signup.events({
  'submit .login-form'(event) {
    event.preventDefault();

    const {target} = event;

    const user = {
      name: target.name.value,
      surname: target.surname.value,
      username: target.username.value,
      password: target.password.value,
    };

    Meteor.call('users.create', user, (err) => {
      if (err) console.log(err);
      Meteor.loginWithPassword(user.username, user.password);
    });
  },
  'click #registered'(event) {
    event.preventDefault();
    Template.instance().state.set('registered', false);
  },
});
