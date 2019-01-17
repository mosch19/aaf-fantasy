function getTeamInfo() {
    const params = '?owner_id=' + sessionStorage.getItem('user_id')
    get('/players' + params)
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
}