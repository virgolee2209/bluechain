import { createContext, useContext } from "react";

const AuthContext = createContext({token:"",setToken:(data:string)=>{}});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
