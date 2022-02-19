import React, { useEffect, useState } from 'react';
import { getList } from '../../services/list';
import axios from 'axios'

function GetDataFromJSON() {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    console.log('useEffect')
    let mounted = true;

    axios.get('http://localhost:5000/items?email=testuser@gmail.com')
        .then(data => {
            setList(data.data.items)
            console.log('list', list)
        })
    return () => mounted = false;
  }, [])

  return(
    <div className="wrapper">
   </div>
  )
}

export default GetDataFromJSON;