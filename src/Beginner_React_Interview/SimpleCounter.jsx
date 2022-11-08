import { useState } from "react";


function SimmpleCounter() {
      const[counter, setCounter] = useState(55);
      function addNumber(){
        setCounter(counter+1);
      }
      function substractNumber(){
        setCounter(counter-1);
      }
    return (
        <div>
            <input type="button" value="plus" onClick={addNumber} />
            <div>{counter}</div>
            <input type="button" value="minus" onClick={substractNumber} />
        </div>
    )
}
export default SimmpleCounter;