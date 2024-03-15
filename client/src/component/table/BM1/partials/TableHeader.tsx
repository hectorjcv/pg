import { StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 30px',
    },
    text: {
        fontSize: 6
    },
    flex1: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '1' },
    flex2: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '2' },
    flex3: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '3' },
    flex4: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '4' },
    flex5: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '5' },
    flex6: { margin:'5px 0',padding:'3px', border: '1px solid #000a', fontSize: 6, flex: '6' },
});

export const TableHeader = ({date,direction,unity,service }: {date:string,direction:string,unity:string,service:string}) => {

    return (
        <>
            <View style={styles.view}>
                <Text style={styles.flex1}>1.- ENTIDAD PROPIETARIA</Text>
                <Text style={styles.flex1}>ALCALDIA MUNICIPIO JUAN GERMAN ROSCIO NIEVES</Text>
                <Text style={styles.flex1}>2.- SERVICIO</Text>
                <Text style={styles.flex1}>{service}</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.flex1}>3.- UNIDAD</Text>
                <Text style={styles.flex1}>{unity}</Text>
                <Text style={styles.flex1}>4.- ESTADO</Text>
                <Text style={styles.flex1}>GUÁRICO</Text>
                <Text style={styles.flex1}>5.- MUNICIPIO</Text>
                <Text style={styles.flex1}>JUAN GERMAN ROSCIO NIEVES</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.flex1}>6.- DIRECCIÓN O LUGAR</Text>
                <Text style={styles.flex1}>{direction}</Text>
                <Text style={styles.flex1}>7.- FECHA</Text>
                <Text style={styles.flex1}>{date}</Text>
            </View>            
        </>
    )
}
