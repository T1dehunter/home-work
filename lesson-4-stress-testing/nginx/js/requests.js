const logData = (cities) => {
    fetch('/api/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: cities})
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
              console.log(data);
        });
}

export {logData};