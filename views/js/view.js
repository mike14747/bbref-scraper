const fetchData = async () => {
    const response = await fetch('/api/errors');
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

const initiateFetch = () => {
    fetchData()
        .then(response => {
            const view = document.getElementById('view');
            const table = document.createElement('table');
            table.className = 'table table-bordered text-center';
            const thead = '<tr class="font-weight-bolder bg-gray5"><td>Season</td><td>Innings</td><td>P</td><td>C</td><td>1B</td><td>2B</td><td>3B</td><td>SS</td><td>LF</td><td>CF</td><td>RF</td></tr>';
            table.innerHTML = thead;

            response.forEach(p => {
                table.innerHTML += '<tr><td>' + p.season + '</td><td>' + p.innings + '</td><td>' + p.errors_p + '</td><td>' + p.errors_c + '</td><td>' + p.errors_1b + '</td><td>' + p.errors_2b + '</td><td>' + p.errors_3b + '</td><td>' + p.errors_ss + '</td><td>' + p.errors_lf + '</td><td>' + p.errors_cf + '</td><td>' + p.errors_rf + '</td></tr>';
            });

            view.appendChild(table);
        })
        .catch(error => {
            document.getElementById('view').innerHTML = `<h4 class="text-danger text-center">An error occurred getting the data! ${error.message}</h4>`;
        });
};

initiateFetch();
