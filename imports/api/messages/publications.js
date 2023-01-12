import {Meteor} from 'meteor/meteor';
import {MessagesCollection} from '../../db/MessagesCollection';
import {UsersInfoCollection} from '../../db/UsersInfoCollection';

Meteor.publish('messages', function (userId) {
  const cursor1 = UsersInfoCollection.findOne({userId: userId});
  if (cursor1) {
    const cursor2 = MessagesCollection.find({userId: cursor1.userId});
    return cursor2;
  }
});

Meteor.publish('message.id', function (messageId) {
  const cursor = MessagesCollection.findOne(messageId);
  if (cursor) return MessagesCollection.find();
});
