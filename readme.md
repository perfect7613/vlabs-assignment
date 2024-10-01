# Chemical Supplies Management

This project is a web-based application for managing chemical supplies. It allows users to view, add, edit, delete, and sort chemical supply data. The application uses HTML, CSS, and JavaScript to provide a user-friendly interface for managing the chemical inventory.

## Features

### 1. View Chemical Supplies
- The main interface displays a table of chemical supplies with columns for:
  - Chemical Name
  - Vendor
  - Density
  - Viscosity
  - Packaging
  - Pack Size
  - Unit
  - Quantity
  - Price
- The table supports sorting by clicking on the column headers.

### 2. Add New Chemical Supply
- Users can add a new chemical supply by clicking the "Add row" button in the toolbar.
- A new row with default values is added to the table, and users can edit the details.

### 3. Edit Chemical Supply
- Users can double-click on any cell in the table to edit its value.
- Changes are saved when the user presses Enter or clicks outside the cell.

### 4. Delete Chemical Supply
- Users can select one or more rows using the checkboxes and delete them by clicking the "Delete row" button in the toolbar.

### 5. Move Rows
- Users can move selected rows up or down using the "Move row up" and "Move row down" buttons in the toolbar.

### 6. Select All Rows
- Users can select or deselect all rows using the "Select All" checkbox in the table header.

### 7. Save and Load Data
- The application saves the chemical supply data to the browser's local storage.
- Users can save the current state by clicking the "Save" button.
- Users can refresh the table to the last saved state by clicking the "Refresh" button.

### 8. Unsaved Changes Warning
- The application warns users about unsaved changes when they try to leave the page.

## Files

### 1. `index.html`
- The main HTML file that defines the structure of the web page.
- Includes the table for displaying chemical supplies and the toolbar with action buttons.

### 2. `styles.css`
- The CSS file that defines the styles for the web page.
- Includes styles for the body, container, toolbar, table, and various elements.

### 3. `script.js`
- The JavaScript file that contains the logic for managing chemical supplies.
- Includes functions for loading and saving data, populating the table, sorting, editing, adding, deleting, and moving rows.

### 4. `middleware.js`
- A middleware file that sets security-related HTTP headers for the application.

## Local Storage

The application uses the browser's local storage to save and load the chemical supply data. This ensures that the data persists across page reloads and browser sessions.

The following functions in `script.js` handle local storage operations:

- `saveData()`: Saves the current state of the chemical supply data to local storage.
- `loadData()`: Loads the chemical supply data from local storage and populates the table.
- `refreshData()`: Refreshes the table to the last saved state from local storage.


