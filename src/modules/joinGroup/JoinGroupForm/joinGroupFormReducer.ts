import {
  CHOOSE_GROUP,
  CHOOSE_ROLE,
  ADD_CHILDREN,
  CHOOSE_PATROL,
  CLEAR_FORM,
} from './JoinGroupFormStore';

export type JoinGroupFormState = {
  troopID: string;
  troopNumber: string;
  patrolID: string;
  role: string;
  children: string[];
};

// Generate initial state
export const initialState: JoinGroupFormState = {
  troopID: '',
  troopNumber: '',
  patrolID: '',
  role: '',
  children: [],
};

export const joinGroupFormReducer = (
  state: JoinGroupFormState = initialState,
  action: any
): JoinGroupFormState => {
  switch (action.type) {
    case CHOOSE_GROUP:
      return {
        ...state,
        troopID: action.group,
        troopNumber: action.groupNum,
      };
    case CHOOSE_ROLE:
      return {
        ...state,
        role: action.role,
      };
    case ADD_CHILDREN:
      return {
        ...state,
        children: action.children,
      };
    case CHOOSE_PATROL:
      return {
        ...state,
        patrolID: action.patrol,
      };
    case CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
};
