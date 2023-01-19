import React from 'react';
import styled from 'styled-components';
import Profile from '@/components/Profile';
import CreateTask from '@/components/CreateTask';
import TaskList from '@/components/TaskList';
import Scheduler from '@/components/Scheduler';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 16px;
  display: grid;
  grid-template-columns: 240px auto;

  div.left-content {
    display: grid;
    grid-template-rows: 80px 50px auto;
    gap: 12px;
  }
`;

function Main() {
  return (
    <Wrapper>
      <div className="left-content">
        <Profile />
        <TaskList />
        <CreateTask />
      </div>
      <div className="right-content">
        <Scheduler />
      </div>
    </Wrapper>
  );
}

export default Main;
