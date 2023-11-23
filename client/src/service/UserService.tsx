import { User } from "../types/DefaultTypes";

export const GetUserStorage = (): User => {
    const user:User = JSON.parse(`${window.localStorage.getItem('user')}`);

    return user;
}
