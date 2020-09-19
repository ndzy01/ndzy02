import { FormItemProps } from '@/component/form/form-types';

export const FormItemText = (props: FormItemProps) => {
  if (props.textType && props.textType.render) {
    return props.textType.render(props.name);
  }
  return props?.value;
};
