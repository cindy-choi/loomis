import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router';
import ROUTES from '@/constants/routes';

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const AddButton = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--black-10);
  border: 2px solid var(--black-60);
  cursor: pointer;

  &:hover {
    background: var(--primary-80);
    color: var(--white);
  }
`;

function Main() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <MainWrapper>
      <AddButton onClick={handleCreate}>
        <span className="material-icons">add</span>
      </AddButton>
    </MainWrapper>
  );
};

export default Main;
