import { GetUserStorage } from "../service/UserService"
import { Navigate } from "./useNavigate"

export const OnSession = (session: boolean) => {
    if (session != true) {
        Navigate('/')
    }
}

export const OffSession = (session: boolean) => {
    if (session == true) {
        const user = GetUserStorage();
        if(!user.role){
            return Navigate('/')
        }
        if(user.role == 'ADMIN') return Navigate('/admin/dashboard')
        if(user.role == 'SECRETARY') return Navigate('/secretary/dashboard')
        return Navigate('/direct/dashboard')
    }
}
