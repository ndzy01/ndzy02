import { useContext } from 'react';
import { FormItemProps } from './types';

import { FormItemContext } from './context';

export const FormItemText = (props: FormItemProps) => {
  const state = useContext(FormItemContext);
  if (props.textType && props.textType.render) {
    return props.textType.render(props.name);
  }
  return props.value || state.defaultValue;
};
