import { ReactNode } from "react";

export const CardSingle = ({children, w, cls}: {children:ReactNode, w?:string, cls?:string}) => {

    return (
        <div className={`p-5 shadow bg-white rounded-lg grid grid-rows[73px_98px_64px] ${cls} ${w}`}>
            {children}
        </div>
    );
}