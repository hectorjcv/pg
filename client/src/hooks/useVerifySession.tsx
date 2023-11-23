import { Navigate } from "./useNavigate"

export const OnSession = (session: boolean) => {
    if (session != true) {
        Navigate('/')
    }
}

export const OffSession = (session: boolean) => {
    if (session == true) {
        Navigate('/dashboard')
    }
}
