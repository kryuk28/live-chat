import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {MessagesCollection} from '../../db/MessagesCollection';

Meteor.methods({
  'messages.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    MessagesCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'messages.remove'(messageId) {
    check(messageId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const message = MessagesCollection.findOne({
      _id: messageId,
      userId: this.userId,
    });

    if (!message) {
      throw new Meteor.Error('Access denied.');
    }

    MessagesCollection.remove(messageId);
  },
});
