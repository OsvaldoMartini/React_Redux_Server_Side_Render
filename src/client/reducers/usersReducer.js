/**
|--------------------------------------------------
| This Reducer it going to Watch the FETCH_USERS action creator
|--------------------------------------------------
*/
import { FETCH_USERS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};
