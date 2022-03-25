type SelectedItem = { id: number | string };

const getSelectedItemsAfterSelect = (
  state: { [key: string]: SelectedItem[] },
  items: SelectedItem[],
  itemsKey: string
): { [key: string]: SelectedItem[] } => ({
  ...state,
  [itemsKey]: !(itemsKey in state)
    ? items
    : [
        ...state[itemsKey],
        ...items.filter(
          (payloadItems) =>
            !state[itemsKey].some((item) => item.id === payloadItems.id)
        ),
      ],
});

const getSelectedItemsAfterUnselect = (
  state: { [key: string]: SelectedItem[] },
  items: SelectedItem[],
  itemsKey: string
): { [key: string]: SelectedItem[] } => ({
  ...state,
  [itemsKey]: !(itemsKey in state)
    ? []
    : state[itemsKey].filter(
        (selectedItem) => !items.some((item) => item.id === selectedItem.id)
      ),
});

export default { getSelectedItemsAfterSelect, getSelectedItemsAfterUnselect };
