import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Draft from '@/store/Drafts';

import type { ManualProps } from '@/types/Drafts';

const Guide = styled.div`
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

  div.preview {
    margin-top: 5%;
    width: calc( 2048px * 0.3);
    height: calc( 1024px * 0.3);;
    background: var(--black-05);
    position: relative;
  }
`;

const Min = styled.div<{ width: number; height: number }>`
  visibility: ${props => (!props.width && !props.height) ? 'hidden' : 'visible'};
  position: absolute;
  left: 0;
  bottom: 0;
  border: 2px solid blue;
  background: var(--primary-10);
  width: calc(${props => props.width}px * 0.3);
  height: calc(${props => props.height}px * 0.3);
`;
const Opt = styled.div<{ width: number; height: number }>`
  visibility: ${props => (!props.width && !props.height) ? 'hidden' : 'visible'};
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--primary-50);
  width: calc(${props => props.width}px * 0.3);
  height: calc(${props => props.height}px * 0.3);
`;
const Max = styled.div<{ width: number; height: number }>`
  visibility: ${props => (!props.width && !props.height) ? 'hidden' : 'visible'};
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--primary-80);
  width: calc(${props => props.width}px * 0.3);
  height: calc(${props => props.height}px * 0.3);
`;

const Footer = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  > button {
    transition: 0.3s ease;
    opacity: 1;
    visibility: visible;

    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

type EssentialScreenFormProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

export const EssentialScreenForm = ({
  hasNext,
  hasPrev,
  onPrev,
  onNext,
}: EssentialScreenFormProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<string>("");
  const [minWidth, setMinWidth] = useState<number | undefined>();
  const [optWidth, setOptWidth] = useState<number | undefined>();
  const [maxWidth, setMaxWidth] = useState<number | undefined>();
  const [minHeight, setMinHeight] = useState<number | undefined>();
  const [optHeight, setOptHeight] = useState<number | undefined>();
  const [maxHeight, setMaxHeight] = useState<number | undefined>();

  const handlePrev = () => {
    Draft.setEssentialScreen({
      minWidth,
      optWidth,
      maxWidth,
      minHeight,
      optHeight,
      maxHeight,
    });

    onPrev && onPrev();
  };
  const handleNext = () => {
    // TODO

    onNext && onNext();
  };

  const handleChange = (type: string, value: string) => {
    if (Number.isNaN(value)) return;

    switch (type) {
      case "minWidth":
        setMinWidth(Number(value));
        break;
      case "optWidth":
        setOptWidth(Number(value));
        break;
      case "maxWidth":
        setMaxWidth(Number(value));
        break;
      case "minHeight":
        setMinHeight(Number(value));
        break;
      case "optHeight":
        setOptHeight(Number(value));
        break;
      case "maxHeight":
        setMaxHeight(Number(value));
        break;
    }
  };

  const setPrevInfo = async () => {
    const draft: ManualProps | null = await Draft.getDraft();
    if (!draft) {
      setLoading(false);
      return;
    }

    setProject(draft.project);

    // 초기값
    setMinWidth(draft.essential?.screen?.minWidth || 0);
    setOptWidth(draft.essential?.screen?.optWidth || 1024);
    setMaxWidth(draft.essential?.screen?.maxWidth || 0);
    setMinHeight(draft.essential?.screen?.minHeight || 0);
    setOptHeight(draft.essential?.screen?.optHeight || 960);
    setMaxHeight(draft.essential?.screen?.maxHeight || 0);

    setLoading(false);
  };

  useEffect(() => {
    setPrevInfo();
  }, []);

  return (
    <>
      <Guide>
        <p>
          <strong>{project}</strong> 사용에 제약 사항이 있다면 적어봅시다(2).
        </p>
        <br />
        <p className="sub">
          최소, 최대 그리고 최적 해상도를 알려주세요. 정해지지 않은 경우{" "}
          <strong>0</strong>을 입력하면 됩니다.
        </p>
      </Guide>

      {loading ? null : (
        <Form>
          <Table className="inputs">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell> 최소 </TableCell>
                <TableCell> 최적 </TableCell>
                <TableCell> 최대 </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> 너비 </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={minWidth}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("minWidth", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={optWidth}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("optWidth", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={maxWidth}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("maxWidth", e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> 높이 </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={minHeight}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("minHeight", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={optHeight}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("optHeight", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={maxHeight}
                    InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>}}
                    onChange={(e) => handleChange("maxHeight", e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="preview">
            <Min width={minWidth || 0} height={minHeight || 0} />
            <Opt width={optWidth || 0} height={optHeight || 0} />
            <Max width={maxWidth || 0} height={maxHeight || 0} />
          </div>
        </Form>
      )}

      <Footer>
        {hasPrev && <Button onClick={handlePrev}>이전</Button>}
        {hasNext && <Button onClick={handleNext}>다음</Button>}
      </Footer>
    </>
  );
};

export default EssentialScreenForm;
