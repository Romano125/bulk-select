import { useCallback, useContext, useMemo } from 'react';

import context from './context';
import utils from './utils';
import { IUseSelect } from './interfaces';
import { SelectedItem } from './types';

const useSelect = (itemsKey: string): IUseSelect => {
  const [selected, setSelected] = useContext(context);

  const selectedByOrigin: SelectedItem[] = useMemo(
    () => (!(itemsKey in selected) ? [] : selected[itemsKey]),
    [selected, itemsKey]
  );

  const totalSelected = useMemo(
    () => selectedByOrigin.length,
    [selectedByOrigin]
  );

  const isSelected = useCallback(
    (item) =>
      selectedByOrigin.some(
        (selectedItem: SelectedItem) => selectedItem.id === item.id
      ),
    [selectedByOrigin]
  );

  const pageSelectedItems = useCallback(
    (items): SelectedItem[] =>
      selectedByOrigin.filter((selectedItem: SelectedItem) =>
        items.some((item: SelectedItem) => item.id === selectedItem.id)
      ),
    [selectedByOrigin]
  );

  const selectItems = useCallback(
    (items) => {
      setSelected((prevSelected: { [key: string]: SelectedItem[] }) =>
        utils.getSelectedItemsAfterSelect(prevSelected, items, itemsKey)
      );
    },
    [itemsKey, setSelected]
  );

  const unselectItems = useCallback(
    (items) => {
      setSelected((prevSelected: { [key: string]: SelectedItem[] }) =>
        utils.getSelectedItemsAfterUnselect(prevSelected, items, itemsKey)
      );
    },
    [setSelected, itemsKey]
  );

  const handleSelectAll = useCallback(
    (items, isSelectAction) =>
      isSelectAction ? selectItems(items) : unselectItems(items),
    [selectItems, unselectItems]
  );

  const handleSelect = useCallback(
    (item) => (!isSelected(item) ? selectItems([item]) : unselectItems([item])),
    [isSelected, selectItems, unselectItems]
  );

  return {
    handleSelect,
    handleSelectAll,
    isSelected,
    pageSelectedItems,
    selected: selectedByOrigin,
    totalSelected,
  };
};

export default useSelect;
