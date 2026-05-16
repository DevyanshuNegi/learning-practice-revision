import {useState, useEffect} from 'react';


function EffectDemo() {
    const [input, setInput] = useState("");
    

    useEffect(() => {

        let run = true;

        setTimeout(()=> {
            // code run after some time
            if(run){

                console.log("large code.. ..", input
                );
            }

        }, 1000);


        // const fetchData = async () => {
        //     data = "";
        //     // if (run) {
        //     // setResult(data);
        //     return data;
        // }
        // await fetchData();

        return ()=> {
            console.log("killed effect ", input);
            run = false;
        }
    }, [input]);


    function handleChange(event) {
        setInput(event.target.value);
        console.log("changed " , input);
    }
    return (
        <>
            <input type="text" name="Text" id="textinput" onChange={handleChange} />
        </>
    )

}


export default EffectDemo;