import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {GetUsuarioActual} from "../actions/UsuarioAction";
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    GetUsuarioActual()
      .then(result =>{
        if(result.data == ""){
          setUser(USER_STATES.NOT_LOGGED);
          return;
        }
        setUser(result.data)
      })
      .catch(()=>{setUser(USER_STATES.NOT_LOGGED)});
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/login")
  }, [user])

  return user
}
