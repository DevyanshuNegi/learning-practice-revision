import NameCard from './NameCard.jsx';
import {useState} from 'react';

function Props () {

    const [name, setName] = useState("this is init name");

    function handleDelete() {
        setName("new deleted name");   
        console.log("Delete clicked");
    }

    return (
        <>
            <h4>Props Example</h4>
            <NameCard name={name} onDelete={handleDelete}/>
        </>
    )

}


export default Props;