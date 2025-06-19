import { createContext, useState, useEffect } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const filterCache = localStorage.getItem('filterCache');
    const [filter, setFilter] = useState(filterCache !== null ? JSON.parse(filterCache) : {
        name: "",
        type: "",
        modality: "",
        service: "",
        comments: "",
        score: "",
        island: "",
        municipality: "",
        address: ""
    });
    const orderCache = localStorage.getItem('orderCache');
    const [order, setOrder] = useState(orderCache !== null ? JSON.parse(orderCache) : "");
    const typeOrderCache = localStorage.getItem('typeOrderCache');
    const [typeOrder, setTypeOrder] = useState(typeOrderCache !== null ? JSON.parse(typeOrderCache) : "");

    useEffect(() => {
        localStorage.setItem('filterCache', JSON.stringify(filter));
        localStorage.setItem('orderCache', JSON.stringify(order));
        localStorage.setItem('typeOrderCache', JSON.stringify(typeOrder));
    }, [filter, order, typeOrder]);

    return (
        <FilterContext.Provider value={{ filter, setFilter, order, setOrder, typeOrder, setTypeOrder }}>
            {children}
        </FilterContext.Provider>
    );
};