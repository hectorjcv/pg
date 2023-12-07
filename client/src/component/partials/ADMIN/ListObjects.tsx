import { useInventary } from "../../../context/InventaryContext";
import { ParagraxBasic, TextSubtitle, TextTitle } from "../DEFAULT/TextTypes";

export const ListObjects = () => {
    const inv = useInventary();

    return (
        <>
            <aside className='flex justify-between items-center'>
                <TextTitle text="Inventario" />
                <ParagraxBasic text={`${inv.count} registros`} />
            </aside>
            <table className='my-3 table'>
                <thead>
                    <tr className='bg-gray-300 text-black font-bold text-center'>
                        <td className='py-4'>ID</td>
                        <td className='py-4'>Nombre</td>
                        <td className='py-4'>Descripcion</td>
                        <td className='py-4'></td>
                    </tr>
                </thead>
                {
                    inv.objects === null
                    ? <>
                        <TextSubtitle text="No exiten objetos en el inventario" />
                    </>
                    : <tbody>
                        
                        {
                            inv.objects.map((item) => (
                                <tr key={item.id} className='bg-gray-100 text-center'>
                                    <td className='py-2'>{item.id}</td>
                                    <td className='py-2'>{item.name}</td>
                                    <td className='py-2'>{item.description}</td>
                                    <td className='py-2'></td>
                                </tr>
                            ))
                        }
                    </tbody>
                }
            </table>
            <div className='w-full rounded-md flex justify-center items-center gap-x-10'>
                {
                    inv.count > 10 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(0);
                                inv.updateUpdate(true);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>1</button>}
                {
                    inv.count > 20 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(1);
                                console.log()
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>2</button>}
                {
                    inv.count > 30 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(2);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>3</button>}
                {
                    inv.count > 40 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(3);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>4</button>}
                {
                    inv.count > 50 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(4);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>5</button>}
                {
                    inv.count > 60 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(5);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>6</button>}
                {
                    inv.count > 70 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(6);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>7</button>}
                {
                    inv.count > 80 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(7);
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>8</button>}
                {
                    inv.count > 90 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(8);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>9</button>}
                {
                    inv.count > 100 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(9);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>10</button>}
                {
                    inv.count > 110 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(10);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>11</button>}
                {
                    inv.count > 120 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(11);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>12</button>}
                {
                    inv.count > 130 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(12);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>13</button>}
                {
                    inv.count > 140 && 
                        <button 
                            onClick={()=>{ 
                                inv.updateSk(13);
                                console.log(0)
                                inv.updateUpdate(!inv.toUpdate);
                            }} 
                            className='p-3 rounded-md font-bold bg-purple-400 hover:bg-purple-500'>14</button>}
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
    );
}