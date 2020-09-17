import React from 'react';
import { goPageG } from '@/utils';
import { clearStore } from '@/redux/store';
import { Clock } from '@/component/clock';

export const Header = (props: InitProps) => {
  return (
    <div className="flex">
      <Clock></Clock>

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
