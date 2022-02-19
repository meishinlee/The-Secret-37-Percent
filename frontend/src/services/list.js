import axios from 'axios'

export async function getList() {
    return axios.get('http://localhost:5000/items?email=testuser@gmail.com')
        .then(data => {
            // console.log('asdsada',data)
            return data
        })
}