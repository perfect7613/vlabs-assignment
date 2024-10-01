let chemicalData = [
    { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 6495.18, price: 1000 },
    { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 8751.90, price: 1200 },
    { id: 3, name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 5964.61, price: 1500 },
    { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 8183.73, price: 800 },
    { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 4154.33, price: 950 },
    { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34, price: 2000 },
    { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54, price: 1800 },
    { id: 8, name: "Sodium Hydroxide", vendor: "BASF", density: 2130.00, viscosity: 4.00, packaging: "Drum", packSize: 200.00, unit: "kg", quantity: 5000.00, price: 750 },
    { id: 9, name: "Hydrochloric Acid", vendor: "Dow Chemical", density: 1190.00, viscosity: 1.90, packaging: "Tank", packSize: 1000.00, unit: "L", quantity: 10000.00, price: 2500 },
    { id: 10, name: "Ethanol", vendor: "Cargill", density: 789.00, viscosity: 1.20, packaging: "Barrel", packSize: 159.00, unit: "L", quantity: 3180.00, price: 600 },
    { id: 11, name: "Sulfuric Acid", vendor: "Chemours", density: 1840.00, viscosity: 26.70, packaging: "Tank", packSize: 500.00, unit: "kg", quantity: 7500.00, price: 1100 },
    { id: 12, name: "Acetone", vendor: "Shell", density: 784.00, viscosity: 0.32, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 4000.00, price: 550 },
    { id: 13, name: "Methanol", vendor: "Methanex", density: 792.00, viscosity: 0.59, packaging: "IBC", packSize: 1000.00, unit: "L", quantity: 15000.00, price: 3000 },
    { id: 14, name: "Hydrogen Peroxide", vendor: "Solvay", density: 1450.00, viscosity: 1.25, packaging: "Drum", packSize: 200.00, unit: "kg", quantity: 2000.00, price: 900 },
    { id: 15, name: "Nitric Acid", vendor: "Yara", density: 1513.00, viscosity: 0.75, packaging: "IBC", packSize: 1000.00, unit: "kg", quantity: 12000.00, price: 2200 }
];

let unsavedChanges = false;
const table = document.getElementById('chemicalTable');
const tbody = table.querySelector('tbody');
const selectAllCheckbox = document.getElementById('selectAll');

function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('chemicalData');
    if (savedData) {
        chemicalData = JSON.parse(savedData);
    }
}

function saveDataToLocalStorage() {
    localStorage.setItem('chemicalData', JSON.stringify(chemicalData));
    unsavedChanges = false;
}

function populateTable(data) {
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${item.id}</td>
            <td class="editable" data-field="name">${item.name}</td>
            <td class="editable" data-field="vendor">${item.vendor}</td>
            <td class="editable" data-field="density">${item.density.toFixed(2)}</td>
            <td class="editable" data-field="viscosity">${item.viscosity.toFixed(2)}</td>
            <td class="editable" data-field="packaging">${item.packaging}</td>
            <td class="editable" data-field="packSize">${item.packSize}</td>
            <td class="editable" data-field="unit">${item.unit}</td>
            <td class="editable" data-field="quantity">${item.quantity.toFixed(2)}</td>
            <td class="editable" data-field="price">${item.price.toFixed(2)}</td>
        `;
    });
}

function sortTable(column, ascending = true) {
    const sortedData = [...chemicalData].sort((a, b) => {
        if (a[column] < b[column]) return ascending ? -1 : 1;
        if (a[column] > b[column]) return ascending ? 1 : -1;
        return 0;
    });
    populateTable(sortedData);
}

table.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.textContent.toLowerCase().replace(/ /g, '');
        if (column !== '') {
            const ascending = !th.classList.contains('sorted-asc');
            table.querySelectorAll('th').forEach(header => header.classList.remove('sorted-asc', 'sorted-desc'));
            th.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
            sortTable(column, ascending);
        }
    });
});

selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = tbody.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        checkbox.closest('tr').classList.toggle('selected', selectAllCheckbox.checked);
    });
});

tbody.addEventListener('change', (e) => {
    if (e.target.classList.contains('row-checkbox')) {
        e.target.closest('tr').classList.toggle('selected', e.target.checked);
    }
});

function makeEditable(cell) {
    const originalValue = cell.textContent;
    const field = cell.dataset.field;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalValue;
    cell.textContent = '';
    cell.appendChild(input);
    input.focus();

    function saveEdit() {
        const newValue = input.value;
        cell.textContent = newValue;
        const row = cell.closest('tr');
        const id = parseInt(row.cells[1].textContent);
        const item = chemicalData.find(item => item.id === id);
        if (item) {
            item[field] = ['density', 'viscosity', 'packSize', 'quantity', 'price'].includes(field) ? parseFloat(newValue) : newValue;
        }
        unsavedChanges = true;
    }

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cell.textContent = originalValue;
        }
    });
}

tbody.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('editable')) {
        makeEditable(e.target);
    }
});

document.getElementById('addRow').addEventListener('click', () => {
    const newId = Math.max(...chemicalData.map(item => item.id)) + 1;
    const newItem = {
        id: newId,
        name: "New Chemical",
        vendor: "New Vendor",
        density: 0,
        viscosity: 0,
        packaging: "N/A",
        packSize: 0,
        unit: "N/A",
        quantity: 0,
        price: 0
    };
    chemicalData.push(newItem);
    populateTable(chemicalData);
    unsavedChanges = true;
});

document.getElementById('moveDown').addEventListener('click', () => {
    const selectedRows = Array.from(tbody.querySelectorAll('tr.selected'));
    if (selectedRows.length === 1 && selectedRows[0].nextElementSibling) {
        tbody.insertBefore(selectedRows[0].nextElementSibling, selectedRows[0]);
        updateChemicalDataOrder();
    }
});

document.getElementById('moveUp').addEventListener('click', () => {
    const selectedRows = Array.from(tbody.querySelectorAll('tr.selected'));
    if (selectedRows.length === 1 && selectedRows[0].previousElementSibling) {
        tbody.insertBefore(selectedRows[0], selectedRows[0].previousElementSibling);
        updateChemicalDataOrder();
    }
});

function updateChemicalDataOrder() {
    const newOrder = Array.from(tbody.querySelectorAll('tr')).map(row => parseInt(row.cells[1].textContent));
    chemicalData = newOrder.map(id => chemicalData.find(item => item.id === id));
    unsavedChanges = true;
}

document.getElementById('deleteRow').addEventListener('click', () => {
    const selectedRows = tbody.querySelectorAll('tr.selected');
    selectedRows.forEach(row => {
        const id = parseInt(row.cells[1].textContent);
        chemicalData = chemicalData.filter(item => item.id !== id);
        row.remove();
    });
    unsavedChanges = true;
});

document.getElementById('refresh').addEventListener('click', () => {
    if (unsavedChanges) {
        const confirmRefresh = confirm("You have unsaved changes. Are you sure you want to refresh? This will discard all unsaved changes.");
        if (!confirmRefresh) {
            return;
        }
    }
    loadDataFromLocalStorage();
    populateTable(chemicalData);
    unsavedChanges = false;
});

document.getElementById('save').addEventListener('click', () => {
    saveDataToLocalStorage();
    alert('Data saved successfully!');
    console.log('Saved data:', chemicalData);
});

window.addEventListener('beforeunload', (event) => {
    if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
    }
});

loadDataFromLocalStorage();
populateTable(chemicalData);