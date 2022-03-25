import { Dispatch, SetStateAction } from 'react';

export type SelectedItem = { id: number | string };

export type SelectedItems = { [key: string]: SelectedItem[] };

export type BulkSelectContext = [
  SelectedItems,
  Dispatch<SetStateAction<SelectedItems>>
];
