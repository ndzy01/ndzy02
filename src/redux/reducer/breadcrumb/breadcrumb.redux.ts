import { createActions, handleActions } from 'redux-actions';
import {
  CHANGE_BREADCRUMB,
  RESET_BREADCRUMB,
  CLEAR_BREADCRUMB
} from '@/redux/actionTypes';

interface BreadcrumbStore {
  path?: string;
  name: string;
}

const breadcrumb: BreadcrumbStore[] = [];

const breadcrumbAction = createActions({
  [CHANGE_BREADCRUMB]: (breadcrum: BreadcrumbStore) => breadcrum,
  [RESET_BREADCRUMB]: (breadcrums: BreadcrumbStore[]) => breadcrums,
  [CLEAR_BREADCRUMB]: () => []
});
// console.log(breadcrumbAction);
export const changeBreadcrumb = breadcrumbAction.changeBreadcrumb;
export const resetBreadcrumb = breadcrumbAction.resetBreadcrumb;
export const clearBreadcrumb = breadcrumbAction.clearBreadcrumb;

export const breadcrumbReducer = handleActions(
  {
    [CHANGE_BREADCRUMB]: (state, action: any) => [...state, action.payload],
    [RESET_BREADCRUMB]: (state, action) => [...action.payload],
    [CLEAR_BREADCRUMB]: (state, action) => action.payload
  },
  breadcrumb
);

export default breadcrumbReducer;
