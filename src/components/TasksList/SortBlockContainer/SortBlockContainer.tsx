import { ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState, updateSortAscAction, updateSortFieldAction } from '../../../store';
import { SortBlock } from './SortBlock/SortBlock';

export function SortBlockContainer() {
  const dispatch = useDispatch();
  const sortAsc = useSelector<IState, boolean>((state) => state.sortAsc);
  const sortField = useSelector<IState, string>((state) => state.sortField);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(updateSortAscAction(!sortAsc));
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSortFieldAction(event.currentTarget.value));
  }

  return (
    <SortBlock sortAsc={sortAsc} sortField={sortField} sortFieldHandleClick={handleClick} sortAscHandleChange={handleChange} />
  );
}
