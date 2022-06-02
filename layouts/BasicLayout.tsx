import React from 'react';
import styled from 'styled-components';

type LayoutProps = {
  children?: React.ReactNode;
};

const StyledBasicLayout = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
`;

function BasicLayout({ children }: LayoutProps) {
  return (
    <StyledBasicLayout>
      {children}
    </StyledBasicLayout>
  );
}

export default BasicLayout;
