import { Navigate } from "../../hooks/useNavigate"

const IndexPage = () => {

    return (
        <>
            index
            <button className='bg-amber-600' onClick={()=>{Navigate('/login')}}>login</button>
        </>
    )
}

export { IndexPage }
