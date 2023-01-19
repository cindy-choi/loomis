import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
`;
const DayItem = styled.div<{ active: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${(props) => (props.active ? 'red' : 'white')};
`;

type DateSelectorProps = {
  date: string | Date;
  onChange?: () => void;
};
export const DateSelector = ({ date, onChange }: DateSelectorProps) => {
  const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [days, setDays] = useState<Array<Date>>([]);
  useEffect(() => {
    let current = date;
    if (!date) current = moment().startOf('day');

    setDays([
      moment(current).subtract(3, 'd'),
      moment(current).subtract(2, 'd'),
      moment(current).subtract(1, 'd'),
      current,
      moment(current).add(1, 'd'),
      moment(current).add(2, 'd'),
      moment(current).add(3, 'd'),
    ]);
  }, [date]);

  return (
    <Wrapper>
      {days.map((day) => (
        <DayItem key={day.toString()} active={moment(date).isSame(day, 'day')}>
          <span>{WEEKDAYS[day.day()]}</span>
          <h1>{day.format('DD')}</h1>
        </DayItem>
      ))}
    </Wrapper>
  );
};

export default DateSelector;
