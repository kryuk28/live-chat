import {Meteor} from 'meteor/meteor';
import '/imports/api/users/methods';
import '/imports/api/users/publications';
import '/imports/api/messages/methods';
import '/imports/api/messages/publications';

Meteor.startup(() => {});
