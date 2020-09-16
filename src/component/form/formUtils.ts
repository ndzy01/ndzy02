export const getWidth = (
  props: FormItemProps
): {
  label: { width: string };
  input: {
    width: string;
  };
} => {
  let labelWidth = '';
  let inputWidth = '';
  const labelDefault = props?.labelWidth ?? 30;
  const inputDefault = props?.inputWidth ?? 70;

  if (!props.column) {
    labelWidth = `${labelDefault}%`;
    inputWidth = `${inputDefault}%`;
  }

  if (props.column && props.column <= props.parentColumn) {
    const defaultW = labelDefault * (1 / props.parentColumn);
    const allW = (1 / props.parentColumn) * props.column;
    const w = defaultW / allW;

    labelWidth = `${w}%`;
    inputWidth = `${100 - w}%`;
  }

  if (!props.label && !props.labelShould) {
    labelWidth = '';
    inputWidth = '100%';
  }

  const itemWidth = {
    label: { width: labelWidth },
    input: {
      width: inputWidth
    }
  };
  return itemWidth;
};
