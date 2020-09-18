import { useContext } from 'react';
import { FormContext } from '@/component/form';
import { FormItemProps } from '@/component/form/form-types';


export const FormItemText = (props: FormItemProps) => {
  const state = useContext(FormContext);

  if (props.textType && props.textType.render) {
    return props.textType.render(props.name);
  }
  return state[props.name]?.value;
};
