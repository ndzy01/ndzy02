import React from 'react';
import { goPageG } from '@/utils';
import { InitProps } from '@/types';
import { clearStore } from '@/redux/store';

export const Header = (props: InitProps) => {
  return (
    <div className="flex">
      {/* <Clock></Clock> */}

      <div
        onClick={() => {
          clearStore();
          goPageG('/login');
        }}
      >
        退出
      </div>
    </div>
  );
};
