import { useContext } from 'react';

import { FormContext } from '@/component/form';

export const FormItemText = (props: FormItemProps) => {
  const state = useContext(FormContext);

  if (props.textType && props.textType.render) {
    return props.textType.render(props.name);
  }
  return state[props.name]?.value;
};
