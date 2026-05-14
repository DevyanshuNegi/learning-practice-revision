

function NameCard(props) {

    let name = props.name;

    function handleDelete() {

        props.onDelete();
        
    }
    
    return (
        <>
            <p>this is the name</p>
            <h3>{name}</h3>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default NameCard;