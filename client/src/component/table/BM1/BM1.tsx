import { Document } from '@react-pdf/renderer';
import { PageContainer } from './partials/Page';
import { TableBM1 } from './partials/Table';
import { ObjectCompleted } from '../../../types/ObjectsGroupSub';
import { SubTotal } from '../../../types/alternative';

type list = (ObjectCompleted | null)[];
type long = list[];

export default function BM1 () {
    const listSubTotal: SubTotal[] = [];
    const AllItems: list = JSON.parse(`${window.localStorage.getItem('export')}`);

    const AllChuck: long = [];
    const reset = 10;

    for (let i = 0; i < AllItems.length; i+=reset) {
        let chuck: (ObjectCompleted | null)[] = [
            AllItems[i],
            AllItems[i+1] ? AllItems[i+1] : null ,
            AllItems[i+2] ? AllItems[i+2] : null ,
            AllItems[i+3] ? AllItems[i+3] : null ,
            AllItems[i+4] ? AllItems[i+4] : null ,
            AllItems[i+5] ? AllItems[i+5] : null ,
            AllItems[i+6] ? AllItems[i+6] : null ,
            AllItems[i+7] ? AllItems[i+7] : null ,
            AllItems[i+8] ? AllItems[i+8] : null ,
            AllItems[i+9] ? AllItems[i+9] : null ,
            AllItems[i+10] ? AllItems[i+10] : null ,
        ];

        let newTotal: SubTotal = {sub: 0, total: 0};
        chuck.map((ck) => {
            if(ck === null) return;
            newTotal.sub = parseInt(`${ck.price}`) + newTotal.sub;
            newTotal.total = (parseInt(`${ck.price}`) * parseInt(`${ck.quantity}`)) + newTotal.total;
            listSubTotal.push(newTotal);
        });
        
        AllChuck.push(chuck);
    }

    return (
        <Document>
            {
                AllChuck.map((items, i) => (
                    <PageContainer key={`index--str`}>
                        <TableBM1 pagIndex={i} subtotal={listSubTotal[i == 0 ? i : i-1]} itemsSet={items} />
                    </PageContainer>
                ))
            }
        </Document>
    )
}
