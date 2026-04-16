interface prop {
    clicks:()=>void
}

const Button = (props:prop) => {
    const handleClick = () => {
        props.clicks();
    }

    return (
        <>
            <button onClick={handleClick}>INC</button>
        </>
    )
}

export default Button;