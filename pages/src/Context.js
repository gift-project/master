import { createContext, useState } from "react";
export const TeamC = createContext(null)


const Context = ({ children }) => {
    return (<TeamC.Provider value={{}}>
        {children}
    </TeamC.Provider>)
}

export default Context;