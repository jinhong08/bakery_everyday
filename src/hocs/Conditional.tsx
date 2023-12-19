import React from 'react';

interface ConditionalProps {
  children: JSX.Element;
  condition?: boolean;
}

const Conditional: React.FC<ConditionalProps> = ({
  children,
  condition = true,
}) => {
  return <>{condition && children}</>;
};

export default Conditional;
