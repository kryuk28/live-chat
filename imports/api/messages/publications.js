import {Meteor} from 'meteor/meteor';
import {MessagesCollection} from '../../db/MessagesCollection';

Meteor.publish('messages', function () {
  return MessagesCollection.find();
});

Meteor.publish('message.id', function (messageId) {
  const cursor = MessagesCollection.findOne(messageId);
  if (cursor) return MessagesCollection.find();
});
