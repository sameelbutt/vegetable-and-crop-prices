const prices = {
    lahore: [
        { serial: 1, name: 'Tomato', description: 'Fresh red tomatoes', price: 100 },
        // Other items...
    ],
    faisalabad: [],
    pakpattan: [],
};

function getPrices() {
    const city = document.getElementById('citySelect').value;
    const tableBody = document.getElementById('priceTable');
    const tableContainer = document.getElementById('tableContainer');
    const dateTime = document.getElementById('dateTime');
    tableBody.innerHTML = '';

    if (city !== 'default') {
        prices[city].forEach(item => createTableRow(item, tableBody));
        tableContainer.style.display = 'block';
        let savedDate = JSON.parse(localStorage.getItem('savedTime'));
        if (!savedDate) {
            savedDate = new Date().toLocaleString();
        }
        dateTime.textContent = `Date of last update: ${savedDate}`;
    } else {
        tableContainer.style.display = 'none';
    }
}

function createTableRow(item, tableBody) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.serial}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
    `;
    tableBody.appendChild(row);
}

function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('priceTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

function printTable() {
    const city = document.getElementById('citySelect').value;
    if (city === 'default') return; // Prevent printing if no city is selected

    const cityName = document.getElementById('citySelect').options[document.getElementById('citySelect').selectedIndex].text;
    const table = document.querySelector('table').outerHTML;
    const datetime = document.getElementById('dateTime').textContent;

    // Create a new window and write the HTML for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print - Vegetable Prices</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 10px; text-align: left; }
                thead { background-color: #ddd; color: #000; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${cityName} Vegetable Rates</h1>
                <p>${datetime}</p>
            </div>
            ${table}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
