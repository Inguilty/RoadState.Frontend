import { getCurrentUser } from '../../../__mock__/api';

export const LOAD_USER_SUCCESSFULLY = 'user/LOAD_USER_SUCCESSFULLY';

export const loadUser = user => ({
  type: LOAD_USER_SUCCESSFULLY,
  user
});

export const loadUserAsync = id => async dispatch => {
  try {
    const currentUser = await getCurrentUser(id);
    dispatch(loadUser(currentUser));
  } catch (error) {
    console.log(error);
  }
};
