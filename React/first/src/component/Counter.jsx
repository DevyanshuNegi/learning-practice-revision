
import {useState, useEffect} from 'react';


function Counter () {

    const [name, setName] = useState("");

    function nameChangeHandler(event) {
        setName(event.target.value);

    }

    return (
        <>
            {/* Controlled Component */}
            <input type="text" value={name} onChange={nameChangeHandler}/>

        </>
    )
}

export default Counter;     