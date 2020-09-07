import React from 'react';
// import { RouteChildrenProps } from 'react-router-dom';

const img = <img src={require('@/images/404.png')} alt="404" />;
// interface Props extends RouteChildrenProps {
//   setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
//   setAuthInfo: (authInfo: any) => void;
//   clearStore: () => void;
// }

export const ErrorPage = () =>
  // {
  // setBreadcrumb,
  // setAuthInfo,
  // clearStore
  // }: Props
  {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {img}
      </div>
    );
  };
