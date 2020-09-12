import React from 'react';
import { Rule } from './types';
import { FormItemRequireSymbol } from './FormItemRequireSymbol';
interface Props {
  label?: string;
  labelShould?: boolean;
  width?: string;
  itemLabel?: string;
  rules?: Rule[];
  itemRequireSymbol?: string;
}

export const FormItemLabel = ({
  label,
  labelShould,
  width,
  itemLabel,
  rules,
  itemRequireSymbol
}: Props) => {
  return (
    <>
      {label && (
        <span
          style={{ width: width }}
          className={`itemLabel ${itemLabel && itemLabel}`}
        >
          <FormItemRequireSymbol
            rules={rules}
            itemRequireSymbol={itemRequireSymbol && itemRequireSymbol}
          />
          {label}：
        </span>
      )}
      {!label && labelShould && (
        <span
          style={{ width: width }}
          className={`itemLabel ${itemLabel && itemLabel}`}
        />
      )}
    </>
  );
};
