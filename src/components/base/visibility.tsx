import * as React from 'react';
import { View } from 'react-native';

interface IVisibilityProps {
  visibility: any;
  children: React.ReactNode;
  boundaryComponent?: boolean;
  suspenseComponent?: React.JSX.Element | null;
}

export default function Visibility({
  children,
  visibility,
  boundaryComponent = false,
  suspenseComponent = null,
}: IVisibilityProps) {
  return (
    <>
      {Boolean(visibility) ? (
        children
      ) : boundaryComponent ? (
        <View />
      ) : (
        suspenseComponent
      )}
    </>
  );
}
