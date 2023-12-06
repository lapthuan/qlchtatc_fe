import { useContext, createContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};
 
export const StateContextProvider = ({ children }) => {
    const [isFlipped, setIsFlipped] = useState(false);

	const toggleSidebar = () => {
		setIsFlipped(!isFlipped);
	};
    return (
        <StateContext.Provider 
            value={{
                isFlipped,
                toggleSidebar
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);