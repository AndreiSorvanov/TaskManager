import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentPageAction } from '../../../store';
import { Pagination } from './Pagination';

interface IPaginationContainerProps {
  current: number;
  total: number;
}

export function PaginationContainer({ current, total }: IPaginationContainerProps) {
  const dispatch = useDispatch();

  const prevHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(updateCurrentPageAction(current - 1));
  }

  const nextHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(updateCurrentPageAction(current + 1));
  }

  return (
    <Pagination current={current} total={total} onPrevClick={prevHandleClick} onNextClick={nextHandleClick} />
  );
}
