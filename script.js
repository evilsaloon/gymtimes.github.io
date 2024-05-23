document.addEventListener('DOMContentLoaded', () => {
    fetch('facilities.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#facilities-table tbody');
            data.facilities.forEach(facility => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = facility.facilityname;
                row.appendChild(nameCell);

                let isEmpty = true;
                for (let i = 1; i <= 7; i++) {
                    const hoursCell = document.createElement('td');
                    const hours = facility[`hours${i}`];
                    if (hours) {
                        hoursCell.textContent = hours;
                        isEmpty = false;
                    } else {
                        hoursCell.textContent = '';
                    }
                    row.appendChild(hoursCell);
                }

                if (isEmpty) {
                    const websiteCell = document.createElement('td');
                    websiteCell.colSpan = 7;
                    websiteCell.innerHTML = `<a href="${facility.website}" target="_blank">${facility.title}</a>`;
                    row.innerHTML = '';
                    row.appendChild(nameCell);
                    row.appendChild(websiteCell);
                }

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});