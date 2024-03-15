// import { useRef } from "react";
// import { BodyBM1 } from "./BodyBM1";
// import { HeaderBM1 } from "./HeaderBM1";
// import generatePDF, { Margin } from 'react-to-pdf';
// import { HeaderTitle } from "../HeaderTitle";

import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import BM1 from './BM1';

const styles = StyleSheet.create({
    view: {
        width:'100%',
        height:'100vh' 
    }
})

export const FormatBM1 = () => {

    return (
        <>
            <PDFViewer style={styles.view}>
                <BM1 />
            </PDFViewer>
        </>
    );
}