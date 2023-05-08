import addToGroup from './add-to-group';

export const handler = async (event, context) => {
  await Promise.all([addToGroup].map((func) => func(event, context)));
  return event;
};
