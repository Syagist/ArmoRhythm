import * as PlayerActionCreators from "../actions-creators/player";
import * as UserActionCreators from "../actions-creators/user";

export default {
  ...PlayerActionCreators,
  ...UserActionCreators,
};
