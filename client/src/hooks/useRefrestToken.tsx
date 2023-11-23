import React from "react";
import { GetUserStorage } from "../service/UserService";
import { BASIC_URL } from "../constants";

interface Props {
    cb?: () => void
}

export const RefreshToken: React.FC<Props> = ({cb}) => {
    try {
        const user = GetUserStorage();

        const NewToken = async () => {
            const res = await fetch(`${BASIC_URL}/auth/refresh/token/${user.id}`);
            const response = await res.json();
            window.localStorage.setItem('token', response.body.token);
        }
        NewToken()

        if (cb) cb();
    } catch (error) {
        console.log('ERROR', error);
    }

    return true
}
