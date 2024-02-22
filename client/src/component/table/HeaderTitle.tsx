import LOGO from '../../assets/logo.jpg';
import LOGO2 from '../../assets/logo2.jpg';

export const HeaderTitle = () => {

    return (
        <section className='px-10 pt-3 mb-5 flex justify-between items-center'>
            <img src={LOGO2} className='w-36' />
            <div>
                <p className='w-full text-center text-md '>Alcaldía bolivariana del Municipio</p>
                <p className='w-full text-center text-lg fontbold'>"JUAN GERMAN ROSCIO NIEVES"</p>
                <p className='w-full text-center text-md '>Estado Guárico</p>
                <p className='w-full text-center text-md '>Rif.: G-20000218-8</p>
            </div>
            <img src={LOGO} className='w-24' />
        </section>
    )
}
