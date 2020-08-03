import React from "react";


export const AlertMessageContext = React.createContext({});


const AlertMessageProvider = (props) => {
    const [message, setMessage] = React.useState("")
    const [type, setType] = React.useState("")


    function reset(){
        setType("")
        setMessage("")
    }
    function success(message){
        setType("success")
        setMessage(message)
    }
    
    return (
        <AlertMessageContext.Provider
            value={{
                message,
                setMessage,
                type,
                setType,
                reset,
                success
            }}
        >
            <>{props.children}</>
        </AlertMessageContext.Provider>
    )

}

export default AlertMessageProvider;