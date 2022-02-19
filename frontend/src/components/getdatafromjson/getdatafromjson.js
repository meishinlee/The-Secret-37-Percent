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
    // getList()
    //   .then(items => {
    //     if(mounted) {
    //       setList(items)
    //       console.log('setList', items)
    //     }
    //   })
    return () => mounted = false;
  }, [])

  return(
    <div className="wrapper">
     {/* <h1>My Grocery List</h1> */}
     <ul>
       {list.map(item => <li key={item.item}>{item.name}</li>)}
     </ul>
   </div>
  // <div></div>
  )
}

export default GetDataFromJSON;