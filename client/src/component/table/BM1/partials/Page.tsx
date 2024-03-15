import { FC, ReactNode } from "react";
import { Page, StyleSheet } from '@react-pdf/renderer';
import { HeaderBM1 } from "./Header";

interface Props {
    children: ReactNode
}

const styles = StyleSheet.create({
    page: {
        paddingTop: '10px'
    }
});

export const PageContainer: FC<Props> = ({ children }) => {

    return (
        <Page size={'A4'} orientation="landscape" style={styles.page}>
            <HeaderBM1 />
            {children}    
        </Page>
    )
}
