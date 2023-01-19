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

export const TaskList = () => {
  return (
    <Wrapper>
      <div className="task-list">
        <h1>03</h1>
        <p>Tasks</p>
      </div>
      <div className="event-list">
        <h1>01</h1>
        <p>Events</p>
      </div>
    </Wrapper>
  );
};

export default TaskList;
