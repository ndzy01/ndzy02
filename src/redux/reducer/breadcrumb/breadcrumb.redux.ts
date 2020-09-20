import { createActions, handleActions } from 'redux-actions';
import {
  CHANGE_BREADCRUMB,
  RESET_BREADCRUMB,
  CLEAR_BREADCRUMB
} from '@/redux/actionTypes';

interface BreadcrumbType {
  path: string;
  name: string;
}

const breadcrumb: BreadcrumbType[] = [];

const breadcrumbAction = createActions({
  [CHANGE_BREADCRUMB]: (breadcrums: BreadcrumbType) => breadcrums,
  [RESET_BREADCRUMB]: (breadcrumsList: BreadcrumbType[]) => breadcrumsList,
  [CLEAR_BREADCRUMB]: () => []
});
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
