import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import taskDb from '@/dbs/task';
import eventDb from '@/dbs/event';

import Tab from '@/components/Tab';
import type { TaskProps, EventProps } from '@/types/common';

const Wrapper = styled.div`
  width: 100%;
  height: 100px;

  div.create-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    margin-top: 8px;

    button {
      flex-grow: 1;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > * {
    width: 100%;
  }
`;

export const CreateTask = () => {
  const [type, setType] = useState<'task' | 'event'>('task');
  const [alarm, setAlarm] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>();
  const {
    register,
    getValues,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<TaskProps | EventProps> = async (data) => {
    try {
      const db = type === 'task' ? taskDb : eventDb;
      const response = await db.create(data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reset();
  }, [type]);

  return (
    <Wrapper>
      <Tab tabs={['task', 'event']} selected={type} onChange={(type) => setType(type)} />

      <Form ref={formRef}>
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="title"
          className={`${errors.title ? 'error' : ''}`}
        />
        <textarea {...register('description')} placeholder="note" />
        {type === 'task' ? (
          <>
            <input
              {...register('dueDate', { required: true })}
              type="date"
              className={`${errors.title ? 'error' : ''}`}
              defaultValue={moment().add(1, 'days').format('YYYY-MM-DD')}
            />
            <select {...register('project', { required: true })} className={`${errors.title ? 'error' : ''}`}>
              <option value="personal">PERSONAL</option>
              <option value="ndc">NDC</option>
              <option value="neti">NETI</option>
              <option value="rnd">RND</option>
            </select>
          </>
        ) : null}
        {type === 'event' ? (
          <>
            <input
              {...register('date', { required: true })}
              type="date"
              className={`${errors.date ? 'error' : ''}`}
              defaultValue={moment().format('YYYY-MM-DD')}
            />
            <input
              {...register('startTime', { required: true })}
              type="time"
              className={`${errors.startTime ? 'error' : ''}`}
              defaultValue={moment().format('HH:mm')}
            />
            <input
              {...register('endTime', { required: true })}
              type="time"
              className={`${errors.endTime ? 'error' : ''}`}
              defaultValue={moment().format('HH:mm')}
            />
            <select {...register('repeat')}>
              <option value="NONE">반복 없음</option>
              <option value="DAILY">매일</option>
              <option value="WEEKLY">매주</option>
              <option value="MONTHLY">매월</option>
              <option value="YEARLY">매년</option>
            </select>
            <input
              {...register('until', { required: getValues('repeat') !== 'NONE' })}
              disabled={getValues('repeat') === 'NONE'}
              type="date"
              className={`${errors.title ? 'error' : ''}`}
              defaultValue={moment().add(1, 'weeks').format('YYYY-MM-DD')}
            />
          </>
        ) : null}
      </Form>

      <div className="create-buttons">
        <button type="button" onClick={handleSubmit(onSubmit)}>
          만들기
        </button>
        <button type="button" onClick={() => reset()}>
          초기화
        </button>
      </div>
    </Wrapper>
  );
};

export default CreateTask;
