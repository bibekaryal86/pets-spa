import { PREFETCH_DISPATCH_ACTION } from '../types/common.action.types';
import { PrefetchAction, PrefetchState } from '../utils/prefetch';

const initialState: PrefetchState = {
  isSessionInvalid: false,
  isRefreshTokenRequired: false,
};

export default function prefetch(
  state = initialState,
  action: PrefetchAction,
): PrefetchState {
  switch (action.type) {
    case PREFETCH_DISPATCH_ACTION:
      return {
        isSessionInvalid: action.prefetch.isSessionInvalid,
        isRefreshTokenRequired: action.prefetch.isRefreshTokenRequired,
      };
    default:
      return state;
  }
}
