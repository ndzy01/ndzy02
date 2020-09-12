import { useContext } from 'react';
import { FormItemProps } from './types';

import { FormContext } from './context';

export const FormItemText = (props: FormItemProps) => {
  const state = useContext(FormContext);

  if (props.textType && props.textType.render) {
    return props.textType.render(props.name);
  }
  return props.value || state[props.name].defaultValue;
};
