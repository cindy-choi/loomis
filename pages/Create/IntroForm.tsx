import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Draft from '@/store/Drafts';

import type { ManualProps, } from '@/types/Drafts';

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
    strong {
      color: var(--primary);
      font-size: 5.7rem;
    }
  }

  p.sub {
    font-size: 2rem;
    line-height: 1.2;
    color: var(--black-50);

    strong {
      color: var(--secondary);
      font-size: 2.7rem;
    }
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

  div.examples {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

type IntroFormProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

export const IntroForm = ({ hasNext, hasPrev, onPrev, onNext }: IntroFormProps) => {
  const [project, setProject] = useState<string>('');
  const [intro, setIntro] = useState<string>('');

  const handlePrev = () => {
    Draft.setIntro(intro);

    onPrev && onPrev();
  };
  const handleNext = () => {
    Draft.setIntro(intro);

    onNext && onNext();
  };

  const setPrevInfo = async () => {
    const draft: ManualProps|null = await Draft.getDraft();
    if (!draft) return;

    setProject(draft.project);
  };

  useEffect(() => {
    setPrevInfo();
  }, []);

  return (
    <>
      <Guide>
        <p>매뉴얼 첫 페이지에 들어갈 <strong>소개글</strong>을 작성하세요.</p>
        <br/>
        <p className="sub">
          <strong>{ project }</strong>의 사용 목적, 동작 방식, 활용 이점 등을 알려주세요.
        </p>
      </Guide>

      <Form>
        <TextField
          multiline
          rows={5}
          onChange={(e) => setIntro(e.target.value)}
        />

        <div className="examples">
          <div className="example-item">
            <p>
              {project}는 데이터의 활용성을 높이면서 개인 정보가 보호될 수 있도록 데이터에 대한 비식별화 기능을 제공합니다.
              이 기능들은 빅데이터 처리를 지원하기 위한 Spark 클러스터 기반으로 동작합니다.
              비식별화 과정을 단계별로 제공하여 비전문가도 쉽게 데이터에 대한 비식별 처리를 할 수 있으며, 비식별화 처리 이후 k-익명성에 대한 평가와
              전화번호, 주민등록번호 등 개인 식별 정보가 포함되어 있는지 분석 과정을 통해 안전성을 높일 수 있습니다.
              {project}를 통해 비식별화한 데이터를 공유, 결합하고 분석하여 데이터의 활용성을 한층 높일 수 있습니다.
            </p>
          </div>

          <div className="example-item">
            <p>
              {project}는 ‘리딩데스크’ 라고 하는 분석 환경 관리 단위를 통해 여러 개의 분석 환경을 손쉽게 관리할 수 있으며,
              단 한 번의 저장소 연결로 여러 노트북에서 데이터를 연결하여 사용 가능한 편의성을 제공하고 있습니다.
              데이터 분석과 기계 학습 모델을 구축하는 데이터 전문가 혹은 그에 준하는 사용자들에게
              데이터 탐색에만 집중할 시간을 갖도록 데이터 분석에 필요한 모든 것을 지원할 예정입니다.  이제 복잡한 환경 구축 없이 로그인 만으로 노트북을 실행할 수 있습니다.
            </p>
          </div>
        </div>
      </Form>

      <Footer>
        { hasPrev && <Button onClick={handlePrev}>이전</Button> }
        { hasNext && <Button onClick={handleNext}>다음</Button> }
      </Footer>
    </>
  );
};

export default IntroForm;
