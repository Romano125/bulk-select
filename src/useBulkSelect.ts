import { useCallback, useContext, useMemo } from 'react';

import context from 'src/context';
import utils from 'src/utils';
import { IUseBulkSelect } from 'src/interfaces';
import { SelectedItem, SelectedItems } from 'src/types';

const useBulkSelect = (itemsKey: string): IUseBulkSelect => {
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
        (pageItems: SelectedItem[]) =>
            selectedByKey.filter((selectedItem: SelectedItem) =>
                pageItems.some((pageItem: SelectedItem) => pageItem.id === selectedItem.id),
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

    const clearStateByItemsKey = useCallback(
        () =>
            setSelected((prevSelected: SelectedItems) =>
                utils.resetStateByItemsKey(prevSelected, itemsKey),
            ),
        [itemsKey, setSelected],
    );

    const clearState = useCallback(() => setSelected({}), [setSelected]);

    return {
        handleSelect,
        handleSelectAll,
        isSelected,
        pageSelectedItems,
        selected: selectedByKey,
        totalSelected,
        clearStateByItemsKey,
        clearState,
    };
};

export default useBulkSelect;
