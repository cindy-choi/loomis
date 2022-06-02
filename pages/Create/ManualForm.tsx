import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Draft from '@/store/Drafts';

const Guide = styled.div`
  height: 40%;
  padding: 1rem;

  white-space: break-spaces;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;

  p {
    font-size: 5rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--black-80);
  }

  p.sub {
    font-size: 2rem;
    line-height: 1.2;
    color: var(--black-50);
  }

  strong {
    color: var(--primary);
    font-size: 5.7rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap 8px;

  > div {
    transition: .2s ease;
  }

  .strong {
    transform: scale(1.01);
  }
`;

const Footer = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  > button {
    transition: .3s ease;
    opacity: 1;
    visibility: visible;


    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

type ManualFormProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

export const ManualForm = ({ hasNext, hasPrev, onPrev, onNext }: ManualFormProps) => {
  const [project, setProject] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [message, setMessage] = useState<React.ReactNode>();

  const handleNext = () => {
    Draft.createManual({ project, title, version });

    onNext && onNext();
  };

  useEffect(() => {
    if (!project) {
      setMessage(
        <>
          <p>먼저,<br/><strong>프로젝트 이름</strong>을 입력하세요.</p><br/>
          <p className="sub">이후 자동으로 생성되는 문장에 사용됩니다.</p>
        </>
      );
      return;
    }

    if (!title) {
      setMessage(<p><strong>매뉴얼 제목</strong>을 입력하세요.</p>);
      return;
    }

    if (!version) {
      setMessage(
        <>
          <p><strong>버전</strong>을 입력하세요.<br/>버전은 생략 할 수 있습니다.</p>
          <p className="sub">하단의 다음 버튼을 눌러 계속 진행하세요.</p>
        </>
      );
      return;
    }

    setMessage(<p>작성한 내용을 확인하고,<br/><strong>다음</strong>버튼을 눌러주세요.</p>);

  }, [project, title, version]);

  return (
    <>
      <Guide>
        { message }
      </Guide>

      <Form>
        <TextField
          type="text"
          placeholder="프로젝트 이름"
          onChange={(e) => setProject(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="매뉴얼 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="버전"
          onChange={(e) => setVersion(e.target.value)}
        />
      </Form>

      <Footer>
        { hasNext && <Button className={project && title ? '' : 'hidden'} onClick={handleNext}>다음</Button> }
      </Footer>
    </>
  );
};

export default ManualForm;
