import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

interface AuthContextInterface {
    session: boolean
    setSession: Dispatch<SetStateAction<boolean>>
}

const DefaultContext: AuthContextInterface = {
    session: false,
    setSession: ()=>{}
}

export const AuthContext = createContext(DefaultContext);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    
    const thisResult = window.localStorage.getItem('session');
    const testSession = thisResult == 'true' ? true : false;

    const [session, setSession] = useState(testSession);

    return (
        <AuthContext.Provider value={{
            session,
            setSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
