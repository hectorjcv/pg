import { ReactNode } from "react";

export const CardSingle = ({children, w, cls, h}: {children:ReactNode, w?:string, cls?:string, h?:string}) => {

    return (
        <div className={`p-5 shadow bg-white rounded-lg grid grid-rows[73px_98px_64px] ${h} max-h-[90vh] h-auto overflow-y-auto overscroll-y-auto ${cls} ${w}`}>
            {children}
        </div>
    );
}