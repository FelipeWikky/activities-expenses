import { User } from "../../types/models/user";

export type AuthContext = {
    currentUser?: User;

    signin: (user: User, callback?: Function) => Promise<boolean>;
    signout: (callback?: Function) => void;
};