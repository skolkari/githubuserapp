import * as actions from "../actions/actions";
import { cloneDeep } from "lodash";

const initialState = {
  user: {
    details: {},
    repos: {},
    following: []
  },
  userName: '',
  activeTab: 'Profile',
  followingCount: 10
};

export default function UserReducer(state = initialState, action) {
  let newState = cloneDeep(state);
  switch (action.type) {
    case actions.UPDATE_USERNAME:
      newState.userName = action.data;
      return newState;
    case actions.ACTIVE_INDEX:
      newState.activeTab = action.data;
      return newState;
    case actions.USER_DETAILS:
      newState.user.details = action.data;
      newState.userName = action.data.login;
      newState.activeTab = 'Profile';
      return newState;
    case actions.USER_REPOS:
      newState.user.repos = action.data;
      return newState;
    case actions.USER_FOLLOWING:
      newState.user.following = action.data;
      return newState;
    case actions.FOLLOWING_COUNT:
      newState.followingCount = action.data;
      return newState;
    default:
      return state;
  }
}
