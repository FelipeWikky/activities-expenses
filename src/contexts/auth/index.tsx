import React, { createContext, useCallback, useEffect, useState } from "react";
import { LocalStorage } from "../../services/storage/local";
import { User } from "../../types/models/user";
import { Constants } from "../../utils/constants";
import { AuthContext as AuthContextType } from "./types";


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState<User>();

    useEffect(() => {
        LocalStorage.getItem<User>(Constants.STORAGE.AUTH)
            .then(_setCurrentUser)
    }, []);

    const signin = useCallback(async (user: User, callback?: Function) => {
        _setCurrentUser(user);
        const saved = await LocalStorage.setItem(Constants.STORAGE.AUTH, user);
        if(callback) callback();
        return saved;
    }, []);

    const signout = useCallback((callback?: Function) => {
        LocalStorage.removeItem(Constants.STORAGE.AUTH)
            .then(() => {
                if (callback) callback();
            });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signin, signout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;