import { createContext, ReactNode } from "react";
import { useState } from "react";

interface User {
    id: number | null;
    username: string;
    isLoggedIn: boolean;
    isManager: boolean;
    isAdmin: boolean;
    picture: string;
  }
interface UserContextValue {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>;
}
  interface myp{
    children: ReactNode
}










export const UserContext = createContext<undefined | UserContextValue>(undefined);


export default function UserProvider(props: myp){
    const [user, setUser] = useState<User>({
        id: null,
        username: '',
        isLoggedIn: false,
        isManager: false,
        isAdmin: false,
        picture: '',
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}