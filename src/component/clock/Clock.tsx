import React, { useEffect } from 'react';
import moment from 'moment';
import { Typography } from 'antd';
import { useSetState } from 'ahooks';
const { Paragraph } = Typography;

export const Clock = () => {
  const [state, setStste] = useSetState<{
    date: Date;
    val1: string;
    val2: string;
  }>({
    date: new Date(),
    val1: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    val2: moment(new Date()).format('YYYY-MM-DD-HH-mm-ss')
  });

  useEffect(() => {
    function tick() {
      setStste({ date: new Date() });
      setStste({
        val1: moment(state.date).format('YYYY-MM-DD HH:mm:ss'),
        val2: moment(state.date).format('YYYY-MM-DD-HH-mm-ss')
      });
    }
    const timerID = setInterval(tick, 1000);

    return function clearTick() {
      clearInterval(timerID);
    };
  });

  return (
    <div className="flex justify-between px-4 mr-4">
      <Paragraph copyable className="mr-8">
        {state.val1}
      </Paragraph>
      <Paragraph copyable>{state.val2}</Paragraph>
    </div>
  );
};

