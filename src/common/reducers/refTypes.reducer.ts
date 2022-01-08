import { REF_TYPES_FAILURE, REF_TYPES_SUCCESS } from '../types/common.action.types';
import { DefaultRefTypesState, RefTypesAction, RefTypesState } from '../types/refTypes.data.types';
import { MSG_KEY_REFTYPE_FAIL } from '../utils/constants';

export default function refTypes(state = DefaultRefTypesState, action: RefTypesAction): RefTypesState {
  switch (action.type) {
    case REF_TYPES_SUCCESS:
      return {
        error: '',
        refAccountTypes: action.refAccountTypes,
        refBanks: action.refBanks,
        refCategoryTypes: action.refCategoryTypes,
        refCategories: action.refCategories,
        refTransactionTypes: action.refTransactionTypes,
      };
    case REF_TYPES_FAILURE:
      return {
        ...state,
        error: MSG_KEY_REFTYPE_FAIL,
      };
    default:
      return state;
  }
}
