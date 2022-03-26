import { SelectedItem, SelectedItems } from 'src/types';

const getSelectedItemsAfterSelect = (
    state: SelectedItems,
    newItems: SelectedItem[],
    itemsKey: string,
): SelectedItems => ({
    ...state,
    [itemsKey]: !(itemsKey in state)
        ? newItems
        : [
              ...state[itemsKey],
              ...newItems.filter(
                  (newItem) =>
                      !state[itemsKey].some(
                          (selectedItem: SelectedItem) => selectedItem.id === newItem.id,
                      ),
              ),
          ],
});

const getSelectedItemsAfterUnselect = (
    state: SelectedItems,
    newItems: SelectedItem[],
    itemsKey: string,
): SelectedItems => ({
    ...state,
    [itemsKey]: !(itemsKey in state)
        ? []
        : state[itemsKey].filter(
              (selectedItem: SelectedItem) =>
                  !newItems.some((newItem: SelectedItem) => newItem.id === selectedItem.id),
          ),
});

const resetStateByItemsKey = (state: SelectedItems, itemsKey: string): SelectedItems => ({
    ...state,
    [itemsKey]: [],
});

export default { getSelectedItemsAfterSelect, getSelectedItemsAfterUnselect, resetStateByItemsKey };
