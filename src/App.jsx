import { useState } from 'react';
import {SimpleCounter, FetchingDataFromAnApi, FetchingMultipleUsers, FetchUserDataWithPagination} from './Beginner_React_Interview/index'

import './App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
          {/* <SimpleCounter/> */}
          {/* <FetchingDataFromAnApi/>  */}
          {/* <FetchingMultipleUsers/>  */}
         <FetchUserDataWithPagination/>
      </div>
      
  )
}

export default App
