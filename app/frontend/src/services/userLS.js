import { readObject, saveObject } from '../helpers';

const USER_KEY = 'user';

export const saveUser = (user) => saveObject(USER_KEY, user);

export const getUser = () => readObject(USER_KEY, {});
