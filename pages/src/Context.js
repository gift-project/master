import { createContext, useState } from "react";
export const TeamC = createContext(null)


const Context = ({ children }) => {

    const MyID = 2;


    return (<TeamC.Provider value={{ MyID }}>
        {children}
    </TeamC.Provider>)
}

export default Context;