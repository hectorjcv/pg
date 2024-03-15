import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import LOGO1 from '../../../../assets/logo.jpg';
import LOGO2 from '../../../../assets/logo2.jpg';

const styles = StyleSheet.create({
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '10px 0',
        width: '100vw',
    },
    section: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoa: {
        width: '80px',
        height: 'auto'
    },
    text: {
        fontSize: 13,
        color: '#212529af',
        textAlign: 'right'
    },
    logom: {
        width: '50px',
        height: 'auto'
    }
});


export const HeaderBM1 = () => {

    return(
        <View style={styles.pageHeader}>
            <View style={styles.section}>
                <Image src={LOGO2} style={styles.logoa} />
            </View>
            
            <View style={styles.section}>
                <Text style={styles.text}>Alcaldía Bolivariana del Municipio</Text>
                <Text style={styles.text}>"JUAN GERMAN ROSCIO NIEVES"</Text>
                <Text style={styles.text}>Estado Guárico</Text>
                <Text style={styles.text}>Rif: G- 20000218-8</Text>
            </View>

            <View style={styles.section}>
                <Image src={LOGO1} style={styles.logom} />
            </View>
        </View>
    )
}