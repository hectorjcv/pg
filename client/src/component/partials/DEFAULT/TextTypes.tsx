export const TextTitle = ({text}:{text: string}) => {

    return (
        <h2 className='font-extrabold text-center text-3xl text-blue-800'>{text}</h2>
    );
}

export const TextSubtitle = ({text}:{text: string}) => {

    return (
        <h2 className='font-bold text-center text-xl text-blue-950'>{text}</h2>
    );
}


export const ParagraxOpacity = ({text}:{text: string}) => {

    return (
        <p className='text-gray-500 text-md px-5 my-3'>{text}</p>
    );
}

export const ParagraxBasic = ({text}:{text: string}) => {

    return (
        <p className='text-gray-900 text-lg text-center'>{text}</p>
    );
}