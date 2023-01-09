import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {MessagesCollection} from '../db/MessagesCollection';
import {Tracker} from 'meteor/tracker';
import {ReactiveDict} from 'meteor/reactive-dict';
import './App.html';
import './Message.js';
import './Login.js';
import './SignUp.js';

const IS_LOADING_STRING = 'isLoading';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('messages');
  const handler2 = Meteor.subscribe('usersInfo.all');

  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready() && !handler2.ready());
    this.state.set('registered', true);
  });
});

Template.mainContainer.events({
  'click .user'() {
    Meteor.logout();
  },
  'click #registered'(event) {
    event.preventDefault();
    Template.instance().state.set('registered', false);
  },
});

Template.mainContainer.helpers({
  registered() {
    return Template.instance().state.get('registered');
  },
  messages() {
    if (!isUserLogged()) {
      return [];
    }

    return MessagesCollection.find(
      {},
      {
        sort: {createdAt: -1},
      }
    ).fetch();
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser() {
    return getUser();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  },
});

Template.form.events({
  'submit .message-form'(event) {
    event.preventDefault();

    const {target} = event;
    const text = target.text.value;

    Meteor.call('messages.insert', text);

    target.text.value = '';
  },
});
