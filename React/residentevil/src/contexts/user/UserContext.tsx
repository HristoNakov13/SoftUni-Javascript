import React, { createContext, useState, useMemo } from "react";

import LoggedUser from "./logged-user-interface";

const initialContext: any = {};
export const UserContext = createContext(initialContext);

const initialState: LoggedUser = {
    username: "",
    id: ""
};

const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(initialState);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider
            value={
                {
                    user: value.user,
                    setUser: value.setUser
                }}
        >
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;