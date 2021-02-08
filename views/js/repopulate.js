const repopulateData = async () => {
    const response = await fetch('/api/seasons/repopulate');
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`(code ${response.status})`);
    }
};

const startRepopulate = () => {
    document.getElementById('loading').className = 'd-inline-block';
    repopulateData()
        .then(response => {
            document.getElementById('root').innerHTML = `<h4 class="text-success">${response.message}</h4>`;
        })
        .catch(error => {
            document.getElementById('root').innerHTML = `<h4 class="text-danger text-center">An error occurred repopulating the data... ${error.message}</h4>`;
        })
        .finally(() => {
            if (document.getElementById('loading')) document.getElementById('loading').className = 'd-none';
        });
};
