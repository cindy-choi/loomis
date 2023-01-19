import React from 'react';
import styled from 'styled-components';
// import TheHeader from '@/components/TheHeader';

type LayoutProps = {
  children?: React.ReactNode;
};

const StyledBasicLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-width: 1024px;

  .router-view {
    width: 100%;
    overflow: hidden;
  }
`;

function BasicLayout({ children }: LayoutProps) {
  return (
    <StyledBasicLayout>
      <div className="router-view">{children}</div>
    </StyledBasicLayout>
  );
}

export default BasicLayout;
