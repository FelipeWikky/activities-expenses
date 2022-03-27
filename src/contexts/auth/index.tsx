import React, { createContext, useState } from "react";
import { User } from "../../types/models/user";
import { AuthContext as AuthContextType } from "./types";


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState<User>();

    
    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;