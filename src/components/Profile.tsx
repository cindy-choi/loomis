import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthState } from '@/contexts/auth';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 6px 16px;
  border: 1px solid var(--black);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: 60px 20px auto;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Info = styled.div``;

export const Profile = () => {
  const { user } = useAuthState();

  console.log(user);

  return (
    <Wrapper>
      <Avatar>
        <img src={user.photoURL} />
      </Avatar>
      <Info>
        <p>
          Welcome, <span>{user.displayName}</span>.
        </p>
        <p>{user.email}</p>
      </Info>

      <div className="func-list"></div>
    </Wrapper>
  );
};

export default Profile;
