import { TableHeader } from "./TableHeader";
import { BodyBM1 } from "./Body";
import { ObjectCompleted } from "../../../../types/ObjectsGroupSub";
import { SubTotal } from "../../../../types/alternative";

export const TableBM1 = ({ itemsSet, subtotal,pagIndex }: {itemsSet:(ObjectCompleted | null)[],subtotal:SubTotal,pagIndex:number}) => {

    const items: ObjectCompleted[] = JSON.parse(`${window.localStorage.getItem('export')}`);
    const DataItem = items[0].dep_reference;
    const date = new Date();

    const exacDate = `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()}`;;
    return (
        <>
            <TableHeader 
                date={`${exacDate}`} 
                direction={DataItem.direction_name} 
                service={DataItem.service_name} 
                unity={DataItem.unity_name}
            />
            <BodyBM1 pagIndex={pagIndex} subtotal={subtotal} items={itemsSet} />
        </>
    );
}
