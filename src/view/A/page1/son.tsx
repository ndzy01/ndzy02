import React, { useContext } from 'react';
import { TextComtext } from './TextComtext';
export const Son = () => {
  const { state, setState } = useContext(TextComtext);
  return (
    <div>
      {state?.value}
      <hr />
      <button
        onClick={() => {
          setState({
            value: 'son'
          });
        }}
      >
        son
      </button>
    </div>
  );
};
