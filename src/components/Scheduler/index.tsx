import { useState, useEffect } from 'react';
import styled from 'styled-components';

import DateSelector from './DateSelector';

const Wrapper = styled.div``;

export const Scheduler = () => {
  const [type, setType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  useEffect(() => {}, []);

  const handleDateChange = (day: string | Date) => {
    console.log(day);
  };

  return <Wrapper>{type === 'daily' && <DateSelector onChange={handleDateChange} />}</Wrapper>;
};

export default Scheduler;
