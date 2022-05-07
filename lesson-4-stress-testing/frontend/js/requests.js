const getUserData = (userID) => {
    fetch(`/api/get-user-data/${userID}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
              console.log('USER DATA: ', data);
        });
}

export {getUserData};