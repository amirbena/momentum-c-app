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
            <View style={styles.newProductsTablePosition}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>{t('newProducts.sku')}</Text>
                    <Text style={styles.headerText}>{t('newProducts.productName')}</Text>
                    <Text style={styles.headerText}>{t('newProducts.productPrice')}</Text>
                </View>
                <ScrollView>
                    {newProducts.map(({ sku, name, price }, index) => (
                        <View key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                            <Text style={styles.cell}>{sku}</Text>
                            <Text style={styles.cell}>{name}</Text>
                            <Text style={styles.cell}>{price}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRowEven}>
                        <Text style={styles.cell}>לכל</Text>
                        <Text style={styles.cell}>ל</Text>
                        <Text style={styles.cell}>10$</Text>
                    </View>
                </ScrollView>
            </View>
        </BlueSquare>
    );
};

const styles = StyleSheet.create({
    newProductsPosition: {
        width: 358,
        height: 527,
        marginTop: 200,
        bottom: 200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    newProductsHeaderTitle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 24,
        marginTop:90,
    },
    headerText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '400',
    },
    newProductsTablePosition: {
        marginLeft: 0,
        direction: 'rtl'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 5,
        gap: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',

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
        gap: 50,
        right: 2
    },
    tableRowEven: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#13143A',
        right: 2,
        gap: 60
    },
    cell: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16
    },
});

export default NewProducts;