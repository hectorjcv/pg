import { useInventary } from "../../../context/InventaryContext"

export const TableObjects = () => {

    const inv = useInventary(); 

    return (
        <>
            {
                inv.objects
                ? <>
                    <table className='w-full'>
                        <>
                            <tr className='bg-purple-400 h-[15px]'>
                                <td className='border border-purple-950 p-2 text-center font-bold'>Código</td>
                                <td className='border border-purple-950 p-2 text-center font-bold'>Nombre</td>
                                <td className='border border-purple-950 p-2 text-center font-bold'>Valor</td>
                                <td className='border border-purple-950 p-2 text-center font-bold'>Cantidad</td>
                                <td className='border border-purple-950 p-2 text-center font-bold'>Ubicación</td>
                            </tr>
                        </>
                        <>
                        {
                            inv.objects.map(item => (
                                <tr className='bg-gray-100 border border-purple-950' key={item.id}>
                                    <td className='border border-purple-950 py-1 text-center'>{item.n_identification}</td>
                                    <td className='border border-purple-950 py-1 text-center'>{item.name}</td>
                                    <td className='border border-purple-950 py-1 text-center'>{item.price}</td>
                                    <td className='border border-purple-950 py-1 text-center'>{item.quantity_reference?.fisica}</td>
                                    <td className='border border-purple-950 py-1 text-center'>{item.dep_reference.departament_name}</td>
                                </tr>
                            ))
                        }
                        </>
                    </table>
                    <div className='w-full rounded-md flex justify-center items-center gap-x-10'>
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(0);
                                inv.updateUpdate(true);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>1</button>
                        {
                            inv.count > 10 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(1);
                                        console.log()
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>2</button>}
                        {
                            inv.count > 20 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(2);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>3</button>}
                        {
                            inv.count > 30 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(3);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>4</button>}
                        {
                            inv.count > 40 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(4);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>5</button>}
                        {
                            inv.count > 50 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(5);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>6</button>}
                        {
                            inv.count > 60 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(6);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>7</button>}
                        {
                            inv.count > 70 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(7);
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>8</button>}
                        {
                            inv.count > 80 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(8);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>9</button>}
                        {
                            inv.count > 90 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(9);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>10</button>}
                        {
                            inv.count > 100 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(10);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>11</button>}
                        {
                            inv.count > 110 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(11);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>12</button>}
                        {
                            inv.count > 120 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(12);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>13</button>}
                        {
                            inv.count > 130 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(13);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>14</button>}
                        {
                            inv.count > 140 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(14);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>15</button>}
                        {
                            inv.count > 150 && 
                                <button 
                                    onClick={()=>{ 
                                        inv.updateSk(14);
                                        console.log(0)
                                        inv.updateUpdate(!inv.toUpdate);
                                    }} 
                                    className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>15</button>}
                    </div>
                </>
                : <p>No hay bienes</p>
            }
            
        </>
    )
}