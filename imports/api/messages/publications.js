import {Meteor} from 'meteor/meteor';
import {MessagesCollection} from '../../db/MessagesCollection';
import {UsersInfoCollection} from '../../db/UsersInfoCollection';

Meteor.smartPublish('messages', function () {
  cursor1 = UsersInfoCollection.find();
  cursor2 = MessagesCollection.find();
  return [cursor1, cursor2];
});

Meteor.publish('message.id', function (messageId) {
  const cursor = MessagesCollection.findOne(messageId);
  if (cursor) return MessagesCollection.find();
});
