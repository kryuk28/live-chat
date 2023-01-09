import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {MessagesCollection} from '../db/MessagesCollection';
import {UsersInfoCollection} from '../db/UsersInfoCollection';
import moment from 'moment';
import './Message.html';

Template.message.events({
  'click .delete'() {
    Meteor.call('messages.remove', this._id);
  },
});

Template.message.helpers({
  time() {
    const messageData = this;
    return moment(messageData.createdAt).startOf('second').fromNow();
  },
  user() {
    const messageData = this;
    const userInfo = UsersInfoCollection.findOne({userId: messageData.userId});
    if (userInfo) return userInfo.name + ' ' + userInfo.surname;
  },
});
