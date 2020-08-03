import React from "react";


export const RequestContext = React.createContext({});


const RequestProvider = (props) => {
    const [loading, setLoading] = React.useState(false)

    async function makeQuery(queryFunction, thenCallBack=null, catchCallBack=null){
        setLoading(true)
        let result = []
        try {
            result = await queryFunction()
            if(thenCallBack){
                thenCallBack(result)
            }
            
        } catch (error) {
            if(catchCallBack){
                catchCallBack(error)
            }            
        } finally {
            setLoading(false)
        }

       
        return result
    }

    
    return (
        <RequestContext.Provider
        value={{
            loading,
            makeQuery
        }}
        >
        <>{props.children}</>
        </RequestContext.Provider>
    )
}

export default RequestProvider;