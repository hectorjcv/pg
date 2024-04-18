import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ObjectCompleted } from "../../../../types/ObjectsGroupSub";
import { SubTotal } from "../../../../types/alternative";

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 30px'
    },
    text: {
        fontSize: 6
    },
    flex1: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '1' },
    flex2: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '2' },
    flex3: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '3' },
    flex4: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '4' },
    flex5: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '5' },
    flex6: { padding:'5px', border: '1px solid #000a', fontSize: 7, flex: '6' },
    footer: {
        height: '80px',
        flex:1,
        border: '1px solid #000a',
        padding: '5px'
    },
    flex1bold: {
        flex:'1',
        padding:'5px',
        border: '1px solid #000a',
        fontSize: 7,
        fontWeight: 'bold'
    }
    
});

export const BodyBM1 = ({ items, subtotal, pagIndex }: {items:(ObjectCompleted | null)[], subtotal:SubTotal,pagIndex:number}) => {

    let subTotalNative: SubTotal = {
        sub: 0,
        total: 0
    }

    items.map((key) =>{
        if(!key) return;
        subTotalNative.sub = parseInt(`${key.price}`) + subTotalNative.sub;
        subTotalNative.total = parseInt(`${key.price}`)*parseInt(`${key.quantity}`) + subTotalNative.total;
    })

    return (
        <>
            <View style={styles.view}>
                <Text style={styles.flex1}>GRUPO</Text>
                <Text style={styles.flex1}>SUBGRUPO</Text>
                <Text style={styles.flex1}>SECCIÓN</Text>
                <Text style={styles.flex1}>CANTIDAD</Text>
                <Text style={styles.flex1}>N° IDENTIFICACIÓN</Text>
                <Text style={styles.flex4}>NOMBRE Y DESCRIPCIONDE LOS BIENES</Text>
                <Text style={styles.flex1}>FECHA INCORPORACIÓN</Text>
                <Text style={styles.flex1}>VALOR UNITARIO</Text>
                <Text style={styles.flex1}>VALOR TOTAL</Text>
            </View>
            {
                items.map((key) => (
                    <>{
                        key 
                        ? <View style={styles.view}>
                                <Text style={styles.flex1}>{key.clasification_reference && key.clasification_reference.group_reference.group}</Text>
                                <Text style={styles.flex1}>{key.clasification_reference && key.clasification_reference.sub_group_reference.sub_group}</Text>
                                <Text style={styles.flex1}>
                                    {
                                        key.clasification_reference && 
                                        key.clasification_reference.section_reference && 
                                        key.clasification_reference.section_reference.secction 
                                        ? key.clasification_reference.section_reference.secction
                                        : ``
                                    }
                                </Text>
                                <Text style={styles.flex1}>{key.quantity}</Text>
                                <Text style={styles.flex1}>{key.n_identification}</Text>
                                <Text style={styles.flex4}>{key.name} {key.description}</Text>
                                <Text style={styles.flex1}>{key.create}</Text>
                                <Text style={styles.flex1}>{key.price}</Text>
                                <Text style={styles.flex1}>{ parseInt(`${key.price}`)*parseInt(`${key.quantity}`) }</Text>
                            </View>
                        : <View style={styles.view}>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex4}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                                <Text style={styles.flex1}>_</Text>
                            </View>
                    }</>
                ))                
            }
            <View style={styles.view}>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex4}></Text>
                <Text style={styles.flex1bold}>SUBTOTAL</Text>
                <Text style={styles.flex1}>{subTotalNative.sub}</Text>
                <Text style={styles.flex1}>{subTotalNative.total}</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex1}></Text>
                <Text style={styles.flex4}></Text>
                <Text style={styles.flex1bold}>SUBTOTAL</Text>
                <Text style={styles.flex1}>{pagIndex != 0 ? (subtotal.sub+subTotalNative.sub) : subTotalNative.sub}</Text>
                <Text style={styles.flex1}>{pagIndex != 0 ? (subtotal.total+subTotalNative.total) : subTotalNative.total}</Text>
            </View>

            <View style={styles.view}>
                <Text style={styles.footer}></Text>
                <Text style={styles.footer}></Text>
                <Text style={styles.footer}></Text>
            </View>            
        </>
    )
} 
