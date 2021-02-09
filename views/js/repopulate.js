const repopulateErrors = async () => {
    const response = await fetch('/api/errors/all-seasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: '',
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

const startErrorsRepopulate = () => {
    document.getElementById('loading').className = 'd-inline-block';
    document.getElementById('repop-div').className = 'd-none';
    repopulateErrors()
        .then(response => {
            document.getElementById('root').innerHTML = `<h4 class="text-success">${response.message}</h4>`;
        })
        .catch(error => {
            document.getElementById('root').innerHTML = `<h4 class="text-danger text-center">An error occurred repopulating the data! ${error.message}</h4><div class="text-center"><a href="/repopulate">try again</a></div>`;
        })
        .finally(() => {
            if (document.getElementById('loading')) document.getElementById('loading').className = 'd-none';
        });
};

const addSingleSeasonErrors = async (season) => {
    const response = await fetch('/api/errors/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ season }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

const startSingleSeasonErrors = () => {
    const season = document.getElementById('season').value;
    document.getElementById('singleSeasonForm').reset();
    document.getElementById('loading').className = 'd-inline-block';
    document.getElementById('repop-div').className = 'd-none';
    addSingleSeasonErrors(season)
        .then(response => {
            document.getElementById('root').innerHTML = `<h4 class="text-success">${response.message}</h4>`;
        })
        .catch(error => {
            document.getElementById('root').innerHTML = `<h4 class="text-danger text-center mb-4">An error occurred adding the data! ${error.message}</h4><div class="text-center"><a href="/repopulate">try again</a></div>`;
        })
        .finally(() => {
            if (document.getElementById('loading')) document.getElementById('loading').className = 'd-none';
        });
};

document.getElementById('singleSeasonForm').addEventListener('submit', function (event) {
    event.preventDefault();
    startSingleSeasonErrors();
});

document.getElementById('season').setAttribute('max', new Date().getFullYear());
