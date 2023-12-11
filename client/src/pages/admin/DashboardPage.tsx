import { Notification } from "../../component/partials/DEFAULT/Notification";
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext";
import { GetUserStorage } from "../../service/UserService";

export const DashboardAdmin = () => {
    const auth = useAuth();
    const user = GetUserStorage();
    const noti = useNotification();

    return (
        <>
            { noti.active && <Notification /> }
            <main>
                admin
            </main>
        </>
    )

}