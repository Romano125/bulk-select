### `bulk-select`

Typescript library which provides **useBulkSelect** hook for performing bulk select operations.

# Installation

```sh
npm install bulk-select
```

# Usage

```jsx
function BulkSelect() {
  const bulkSelectHandler = useBulkSelect('collection-key');

  //   Display total selected items based on provided collection key
  return <div>Bulk-Select - {bulkSelectHandler.totalSelected}</div>;
}

ReactDOM.render(
  // Wrap any page with bulk select provider to persist select state
  <BulkSelectProvider>
    <BulkSelect />
  </BulkSelectProvider>,
  document.getElementById('container'),
);
```

# API

### `useBulkSelect`

- `handleSelect` - use to add an item to selected items within collection
- `handleSelectAll` - use to add all items to selected items within collection
- `isSelected` - check if item is selected within collection
- `pageSelectedItems` - get page selected items based on provided page items within collection
- `selected` - get selected items within collection
- `totalSelected` - get number of total selected items within collection
- `clearStateByItemsKey` - removes all items within collection
- `clearState` - removes all collections
