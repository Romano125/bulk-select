import { useCallback, useContext, useMemo } from 'react';

import context from 'src/context';
import utils from 'src/utils';
import { IUseSelect } from 'src/interfaces';
import { SelectedItem, SelectedItems } from 'src/types';

const useSelect = (itemsKey: string): IUseSelect => {
    const [selected, setSelected] = useContext(context);

    const selectedByKey: SelectedItem[] = useMemo(
        () => (!(itemsKey in selected) ? [] : selected[itemsKey]),
        [selected, itemsKey],
    );

    const totalSelected = useMemo(() => selectedByKey.length, [selectedByKey]);

    const isSelected = useCallback(
        (item: SelectedItem) =>
            selectedByKey.some((selectedItem: SelectedItem) => selectedItem.id === item.id),
        [selectedByKey],
    );

    const pageSelectedItems = useCallback(
        (items: SelectedItem[]) =>
            selectedByKey.filter((selectedItem: SelectedItem) =>
                items.some((item: SelectedItem) => item.id === selectedItem.id),
            ),
        [selectedByKey],
    );

    const selectItems = useCallback(
        (items: SelectedItem[]) => {
            setSelected((prevSelected: SelectedItems) =>
                utils.getSelectedItemsAfterSelect(prevSelected, items, itemsKey),
            );
        },
        [itemsKey, setSelected],
    );

    const unselectItems = useCallback(
        (items: SelectedItem[]) => {
            setSelected((prevSelected: SelectedItems) =>
                utils.getSelectedItemsAfterUnselect(prevSelected, items, itemsKey),
            );
        },
        [setSelected, itemsKey],
    );

    const handleSelectAll = useCallback(
        (items: SelectedItem[], isSelectAction: boolean) =>
            isSelectAction ? selectItems(items) : unselectItems(items),
        [selectItems, unselectItems],
    );

    const handleSelect = useCallback(
        (item: SelectedItem) => (!isSelected(item) ? selectItems([item]) : unselectItems([item])),
        [isSelected, selectItems, unselectItems],
    );

    return {
        handleSelect,
        handleSelectAll,
        isSelected,
        pageSelectedItems,
        selected: selectedByKey,
        totalSelected,
    };
};

export default useSelect;
