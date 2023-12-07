import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

export interface ObjNotification {
    type: 'SUCCESS' | 'DANGER',
    notification: string,
}

interface NotificationContextInterface {
    notification: ObjNotification,
    newNotification: Dispatch<SetStateAction<ObjNotification>>,
    active: boolean,
    updateActive: Dispatch<SetStateAction<boolean>>
}

const notificationDefault:ObjNotification = {
    type: 'DANGER',
    notification: ''
}

const DefaultContext: NotificationContextInterface = {
    notification: notificationDefault,
    active: false,
    newNotification: () => {},
    updateActive: () => {}
}

export const NotificationContext = createContext(DefaultContext);

export const NotificationProvider = ({children}: {children: ReactNode}) => {
    
    const [noti, setNoti] = useState<ObjNotification>(notificationDefault);
    const [active, setActive] = useState(false);

    return (
        <NotificationContext.Provider value={{
            notification: noti,
            newNotification: setNoti,
            active: active,
            updateActive: setActive
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext);
