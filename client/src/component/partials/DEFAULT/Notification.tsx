import { useEffect } from "react";
import { useNotification } from "../../../context/NotificationContext";

interface Props {
}

export const Notification: React.FC<Props> = ({}) => {
    //const [display, setDisplay] = useState<displayType>('flex') 
    const noti = useNotification();

    useEffect(()=> {
        setTimeout(()=>{
            noti.updateActive(false);
        }, 3000)
    }, [])

    return (
        <div 
            className={`flex items-center justify-between gap-x-5 absolute z-30 w-[90%] mx-auto lg:w-[450px] lg:bottom-10 lg:right-10 rounded-md px-3 py-5 bg-white shadow-lg border`}
        >
            {
                noti.notification.type == 'SUCCESS' 
                ? <button
                    type='button'
                    className='animate-bounce rounded-full transition-all w-[40px] h-[40px] grid place-items-center hover:font-bold hover:bg-green-600 bg-green-500'></button>
                : <button
                    type='button'
                    className='animate-ping rounded-full transition-all w-[40px] h-[40px] grid place-items-center hover:font-bold hover:bg-red-600 bg-red-500'></button>
            }
            
            <span className='flex-1'>
                {noti.notification.notification}
            </span>
        </div>
    );
}