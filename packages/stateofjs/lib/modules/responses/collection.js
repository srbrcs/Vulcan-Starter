import { createCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';
import { statuses } from '../constants.js';
import { Surveys } from '../surveys/index.js';

export const Responses = createCollection({
  collectionName: 'Responses',

  typeName: 'Response',

  schema,

  permissions: {
    canRead: ['owners', 'admins'],
    canCreate: ['members'],
    // canUpdate: ['owners', 'admins'],
    canUpdate: ({ user, document: response }) => {
      const survey = Surveys.findOne(response.surveyId);
      return Users.isAdmin(user) || user._id === response.userId && survey.status === statuses.open
    },
    canDelete: ['admins'],
  },
});

export default Responses;
