import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check';
import {UsersInfoCollection} from '../../db/UsersInfoCollection';

Meteor.methods({
  'users.create'(user) {
    check(user, {
      name: String,
      surname: String,
      username: String,
      password: String,
    });

    const duplicate = Meteor.users.findOne({username: user.username});
    if (duplicate) {
      alert(`There is already a user with a username: ${duplicate.username}`);
    } else {
      const userId = Accounts.createUser({
        username: user.username,
        password: user.password,
        profile: {
          name: user.name,
          surname: user.surname,
        },
      });
      delete user.password;
      user.userId = userId;

      Meteor.call('usersInfo.add', user);
    }
  },
  'usersInfo.add'(userData) {
    check(userData, {
      name: String,
      surname: String,
      username: String,
      userId: String,
    });
    const duplicate = UsersInfoCollection.findOne({
      userId: userData.userId,
    });
    if (duplicate) {
      throw new Meteor.Error(`There is already a user: ${duplicate.username}`);
    } else {
      userData.createdAt = new Date();
      UsersInfoCollection.insert(userData);
    }
  },
});
