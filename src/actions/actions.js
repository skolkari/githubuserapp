export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const ACTIVE_INDEX = 'ACTIVE_INDEX';
export const USER_DETAILS = 'USER_DETAILS';
export const USER_REPOS = 'USER_REPOS';
export const USER_FOLLOWING = 'USER_FOLLOWING';
export const FOLLOWING_COUNT = 'FOLLOWING_COUNT';

export function updateUserName(data) {
  return { type: UPDATE_USERNAME, data }
}

export function updateActiveIndex(data) {
  return { type: ACTIVE_INDEX, data }
}

export function updateUserDetails(data) {
  return { type: USER_DETAILS, data }
}

export function updateUserRepos(data) {
  return { type: USER_REPOS, data }
}

export function updateUserFollowing(data) {
  return { type: USER_FOLLOWING, data }
}

export function updateFollowingCount(data) {
  return { type: FOLLOWING_COUNT, data }
}
