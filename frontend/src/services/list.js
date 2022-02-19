export function getList() {

    return fetch('http://localhost:5000/items')
        .then(data => {
            console.log(data);
            return data.json();
        })
}