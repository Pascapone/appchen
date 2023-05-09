import addToGroup from './add-to-group';
import createUserModel from './create-user-model';

export const handler = async (event, context) => {
  
  await Promise.all([addToGroup, createUserModel].map((func) => func(event, context)));
  return event;
};