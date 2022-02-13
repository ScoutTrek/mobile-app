import {
  CHOOSE_GROUP,
  CHOOSE_ROLE,
  ADD_CHILDREN,
  CHOOSE_PATROL,
  CLEAR_FORM,
} from './JoinGroupFormStore';

export type JoinGroupFormState = {
  user: string;
  troop: string;
  troopNumber: string;
  patrol: string;
  role: string;
  children: string[];
};

// Generate initial state
export const initialState: JoinGroupFormState = {
  user: '',
  troop: '',
  troopNumber: '',
  patrol: '',
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
        troop: action.group,
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
        patrol: action.patrol,
      };
    case CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
};
