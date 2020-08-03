import React from "react";


export const FilterContext = React.createContext({});


const FilterProvider = (props) => {
    const [searchText, setSearchText] = React.useState("");
    const [filterObject, setFilterObject] = React.useState({});
    const [data, setData] = React.useState([]);
    const [validFilter, setValidFilter] = React.useState(false);

    function clean(obj) {
        for (var propName in obj) { 
          if (obj[propName] === null || obj[propName] === undefined || obj[propName].length === 0 ) {
            delete obj[propName];
          }
        }
      }

    function search(searchText){
        setValidFilter(false)
        setSearchText(searchText)
        if(searchText && searchText.trim().length){
            setValidFilter(true)
        }
    }

    function filter(params){
        clean(params)
        setValidFilter(false)
        setFilterObject(params)
        if(Object.keys(params).length > 0){
            setValidFilter(true)
        }
    }


    return (
        <FilterContext.Provider
            value={{
                searchText,
                filterObject,
                search,
                filter,
                data,
                validFilter
            }}
        >
        <>{props.children}</>
        </FilterContext.Provider>
    )
}

export default FilterProvider