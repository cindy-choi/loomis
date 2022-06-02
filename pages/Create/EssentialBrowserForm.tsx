import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Draft from '@/store/Drafts';

import type { ManualProps, BrowserProps, } from '@/types/Drafts';

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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap 8px;
`;

const BrowserItem = styled.div<{ active?: boolean }>`
  display: flex;
  gap 8px;
  min-width: 50%;

  .label { width: 20%; }
  .input-version { width: 80%; }
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

type EssentialBrowserFormProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

export const EssentialBrowserForm = ({ hasNext, hasPrev, onPrev, onNext }: EssentialBrowserFormProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<string>('');
  const [browsers, setBrowsers] = useState<Array<BrowserProps>>([]);
  const browserList = [
    { name: 'Chrome', icon: '',},
    { name: 'Safari', icon: '', },
    { name: 'Firefox', icon: '', },
    { name: 'Opera', icon: '', },
    { name: 'Edge', icon: '', },
    { name: 'IE', icon: '', },
  ];

  const handleBrowserClick = (target: string) => {
    if (target === 'NONE') {
      setBrowsers([]);
      return;
    }

    const before = [ ...browsers];
    const index = before.findIndex(browser => browser.name === target);

    if (index < 0) {
      setBrowsers([ ...browsers, { name: target, version: ''}]);
    } else {
      before.splice(index, 1);
      setBrowsers(before);
    }
  };

  const handlePrev = () => {
    Draft.setEssentialBrowsers(browsers);

    onPrev && onPrev();
  };
  const handleNext = () => {
    Draft.setEssentialBrowsers(browsers);

    onNext && onNext();
  };

  const handleVersionChange = (target: string, version: string) => {
    if (!target || target === 'NONE' || !version) return;
    setBrowsers(browsers.map(browser => browser.name === target ? { name: target, version, } : {...browser}));
  };

  const setPrevInfo = async () => {
    const draft: ManualProps|null = await Draft.getDraft();
    if (!draft) {
      setLoading(false);
      return;
    }

    setProject(draft.project);
    setBrowsers(draft.essential?.browsers || []);

    setLoading(false);
  };

  useEffect(() => {
    setPrevInfo();
  }, []);

  return (
    <>
      <Guide>
        <p><strong>{project}</strong> 사용에 제약 사항이 있다면 적어봅시다.</p>
        <br/>
        <p>권장 브라우저가 있나요?</p>
      </Guide>

      {
        loading ? null : ( 
          <Form>
            <BrowserItem>
              <FormControlLabel
                className="label"
                label="없음"
                control={
                  <Checkbox
                    checked={!browsers.length}
                    onChange={() => handleBrowserClick('NONE')}
                  />
                }
              />
            </BrowserItem>
            {
              browserList.map(browser => 
                <BrowserItem active={browsers.some(selectedBrowser => selectedBrowser.name === browser.name)}>
                  <FormControlLabel
                    className="label"
                    label={browser.name}
                    control={
                      <Checkbox
                        checked={browsers.some(selectedBrowser => selectedBrowser.name === browser.name)}
                        onChange={() => handleBrowserClick(browser.name)}
                      />
                    }
                  />
                  {
                    browsers.some(selectedBrowser => selectedBrowser.name === browser.name) &&
                    <TextField
                      className="input-version"
                      size="small"
                      defaultValue={browsers.find(selectedBrowser => selectedBrowser.name === browser.name)?.version || ''}
                      onChange={(e) => handleVersionChange(browser.name, e.target.value)}
                    />
                  }
                </BrowserItem>
              )
            }
          </Form>
        )
      }

      <Footer>
        { hasPrev && <Button onClick={handlePrev}>이전</Button> }
        { hasNext && <Button onClick={handleNext}>다음</Button> }
      </Footer>
    </>
  );
};

export default EssentialBrowserForm;
