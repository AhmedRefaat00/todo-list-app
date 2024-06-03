# Far Away Packing List Application
https://todo-list-app00ahmedrefaat.netlify.app

## Project Overview

This project is a simple React application designed to help users create and manage a packing list for trips. The application allows users to add items with a description and quantity, mark items as packed, delete items, sort the list, and clear the list. The user interface provides a summary of the packing status.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

## Components

### `App` Component

The main component that manages the state of the packing list.

- **State Variables**:
  - `items`: An array of items in the packing list.

- **Handlers**:
  - `handleAddItem(item)`: Adds a new item to the list.
  - `handleDelete(itemId)`: Deletes an item from the list by its ID.
  - `handleToggle(itemId)`: Toggles the packed status of an item by its ID.
  - `handleReset()`: Clears all items from the list after a confirmation.

- **Computed Values**:
  - `numItems`: The total number of items.
  - `numPacked`: The number of packed items.
  - `percentage`: The percentage of packed items.

- **Render**: Renders the `AddForm`, `List`, and a summary of the packing status.

### `AddForm` Component

A form for adding new items to the packing list.

- **State Variables**:
  - `quantity`: The quantity of the item.
  - `description`: The description of the item.

- **Handlers**:
  - `handleSelect(e)`: Updates the quantity state based on the user's selection.
  - `handleDisc(e)`: Updates the description state based on the user's input.
  - `handleSubmit(e)`: Adds the new item to the list and resets the form fields.

- **Render**: Renders a form with a dropdown for quantity, a text input for description, and an add button.

### `List` Component

Displays the list of items with sorting and delete functionality.

- **Props**:
  - `items`: The list of items to display.
  - `onDelete`: Handler for deleting an item.
  - `onToggle`: Handler for toggling the packed status of an item.
  - `onReset`: Handler for clearing the list.

- **State Variables**:
  - `sortBy`: The criteria for sorting the list (input order, description, status).

- **Handlers**:
  - `setSortBy(e)`: Updates the sort criteria based on user selection.

- **Render**: Renders the list of items with checkboxes for packed status, delete buttons, sorting options, and a clear list button.

## Usage

1. **Add Items**: Use the form to add items with a description and quantity.
2. **Toggle Packed Status**: Click the checkbox next to an item to mark it as packed or unpacked.
3. **Delete Items**: Click the ❌ button next to an item to remove it from the list.
4. **Sort Items**: Use the dropdown to sort items by input order, description, or status.
5. **Clear List**: Click the "Clear List" button to remove all items from the list.

## Example Code

Here is an example of how to add the necessary code to your `App.js` file:

```javascript
import React, { useState } from 'react';

const initialItems = [];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDelete = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleToggle = (itemId) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleReset = () => {
    const confirm = window.confirm('Are you sure you want to delete all items?');
    if (confirm) setItems([]);
  };

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <div>
      <header>
        <h1>🌴 Far Away 💼</h1>
      </header>
      <AddForm onAddItem={handleAddItem} />
      <List
        items={items}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onReset={handleReset}
      />
      <footer className="stats">
        {numItems === 0 ? (
          <em>Start adding some items to your packing list 🚀</em>
        ) : (
          <em>
            {percentage === 100
              ? 'You got everything! Ready to go ✈️'
              : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
          </em>
        )}
      </footer>
    </div>
  );
}
```

## Conclusion

This application helps users efficiently manage their packing list for trips. It provides a straightforward interface to add, delete, sort, and clear items while tracking the packing progress. Enjoy your trip with a well-organized packing list!
