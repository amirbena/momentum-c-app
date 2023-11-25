import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BlueSquare from '../blueSquare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const NewProducts = () => {
    const { t } = useTranslation();
    const { newProducts } = useSelector(state => state.sells);

    return (
        <BlueSquare style={styles.newProductsPosition}>
            <Text style={styles.newProductsHeaderTitle}>{t('newProducts.title')}</Text>
            <ScrollView style={styles.newProductsTablePosition}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>{t('newProducts.sku')}</Text>
                    <Text style={styles.headerCell}>{t('newProducts.productName')}</Text>
                    <Text style={styles.headerCell}>{t('newProducts.productPrice')}</Text>
                </View>
                {newProducts.map(({ sku, name, price }, index) => (
                    <View key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                        <Text style={styles.cell}>{sku}</Text>
                        <Text style={styles.cell}>{name}</Text>
                        <Text style={styles.cell}>{price}</Text>
                    </View>
                ))}
            </ScrollView>
        </BlueSquare>
    );
};

const styles = StyleSheet.create({
    newProductsPosition: {
        width: 358,
        height: 597,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    newProductsHeaderTitle: {
        color: '#FFF',
        textAlign: 'center',
        
        fontSize: 24,
        marginTop: 10,
    },
    newProductsTablePosition: {
        marginLeft: 0,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerCell: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        flex: 1,
    },
    tableRowOdd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#1E2052',
    },
    tableRowEven: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#13143A',
    },
    cell: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        flex: 1,
    },
});

export default NewProducts;