import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {UsersInfoCollection} from '../../db/UsersInfoCollection';

Meteor.publish('usersInfo.all', function () {
  return UsersInfoCollection.find();
});
