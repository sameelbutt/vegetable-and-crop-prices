document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const cityForm = document.getElementById('addCityForm');
    const vegetableForm = document.getElementById('addVegetableForm');
    const updateVegetableForm = document.getElementById('editVegetableForm');

    // Show/Hide forms
    document.getElementById('showAddCity').addEventListener('click', () => {
        cityForm.classList.remove('hidden');
        vegetableForm.classList.add('hidden');
        updateVegetableForm.classList.add('hidden');
    });

    document.getElementById('showAddVegetable').addEventListener('click', () => {
        cityForm.classList.add('hidden');
        vegetableForm.classList.remove('hidden');
        updateVegetableForm.classList.add('hidden');
    });

    document.getElementById('showUpdateVegetable').addEventListener('click', () => {
        cityForm.classList.add('hidden');
        vegetableForm.classList.add('hidden');
        updateVegetableForm.classList.remove('hidden');
    });

    // Fetch and populate city dropdown for vegetable form
    if (citySelect) {
        fetch('/api/cities')
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city._id;
                    option.textContent = city.name;
                    citySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching cities:', error));
    }

    // Handle city form submission
    if (cityForm) {
        cityForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const cityName = document.getElementById('cityName').value;

            fetch('/cities/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ name: cityName }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById('cityMessage').textContent = data.message;
                    cityForm.reset();
                } else {
                    console.error('Error adding city:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle vegetable form submission
    if (vegetableForm) {
        vegetableForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const city = document.getElementById('citySelect').value;
            const serialNo = document.getElementById('vegSerialNo').value;
            const name = document.getElementById('vegName').value;
            const description = document.getElementById('vegDescription').value;
            const price = document.getElementById('vegPrice').value;

            fetch('/vegetables/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ city, serialNo, name, description, price }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById('vegetableMessage').textContent = data.message;
                    vegetableForm.reset();
                } else {
                    console.error('Error adding vegetable:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle update vegetable form submission
    if (updateVegetableForm) {
        updateVegetableForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const serialNo = document.getElementById('editVegSerialNo').value;
            const name = document.getElementById('editVegName').value;
            const description = document.getElementById('editVegDescription').value;
            const price = document.getElementById('editVegPrice').value;

            // Assume there's an element to store the vegetable ID for updating
            const vegetableId = document.getElementById('updateVegetableId').value;

            fetch(`/vegetables/${vegetableId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ serialNo, name, description, price }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    document.getElementById('updateVegetableMessage').textContent = data.message;
                    updateVegetableForm.reset();
                } else {
                    console.error('Error updating vegetable:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
