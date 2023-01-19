import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: stretch;
  padding: 8px;
  width: 100%;
`;
const TabItem = styled.div<{ activate: booelan }>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${(props) => (props.activate ? 'var(--black)' : 'var(--white)')};
  color: ${(props) => (props.activate ? 'var(--white)' : 'var(--black)')};
  cursor: pointer;
  border-radius: 8px;
`;

type TabProps = {
  tabs: Array<string>;
  selected?: string;
  onChange: () => void;
};

export const Tab = ({ tabs = [], selected, onChange }: TabProps) => {
  useEffect(() => {
    if (!tabs.length) return;
    if (!selected) onChange(tabs[0]);
  }, []);

  const handleClickTab = (tab: string) => {
    if (tab === selected) return;
    onChange(tab);
  };

  return (
    <Wrapper>
      {tabs.map((tab) => (
        <TabItem activate={selected === tab} onClick={() => handleClickTab(tab)} key={`tab-${tab}`}>
          {tab}
        </TabItem>
      ))}
    </Wrapper>
  );
};

export default Tab;
