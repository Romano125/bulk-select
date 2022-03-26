import { SelectedItem } from 'src/types';

export interface IUseBulkSelect {
    handleSelect: (item: SelectedItem) => void;
    handleSelectAll: (items: SelectedItem[], isSelectAction: boolean) => void;
    isSelected: (item: SelectedItem) => boolean;
    pageSelectedItems: (pageItems: SelectedItem[]) => SelectedItem[];
    selected: SelectedItem[];
    totalSelected: number;
    clearStateByItemsKey: () => void;
    clearState: () => void;
}
