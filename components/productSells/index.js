import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlueSquare from '../blueSquare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const ProductSells = () => {
  const { t } = useTranslation();


  const { sellsToday } = useSelector((state) => state.sells);

  return (
    <BlueSquare style={styles.productSellsPosition}>
      <View style={styles.productSellsTablePosition}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>{t('productSells.sku')}</Text>
          <Text style={styles.headerText}>{t('productSells.productName')}</Text>
          <Text style={styles.headerText}>{t('productSells.productPrice')}</Text>
        </View>
        <ScrollView>
          {sellsToday.map(({ sku, name, price }, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{sku}</Text>
              <Text style={styles.tableCell}>{name}</Text>
              <Text style={styles.tableCell}>{price}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>fkfk</Text>
            <Text style={styles.tableCell}>ddkdk</Text>
            <Text style={styles.tableCell}>kfkf</Text>
          </View>
        </ScrollView>
      </View>
    </BlueSquare>
  );
};

export const styles = StyleSheet.create({
  productSellsPosition: {
    width: 358,
    height: 349,
    flexShrink: 0,
    marginTop: 200,
    bottom: 190,
    marginRight: 0,
    paddingBottom: 20,
    overflow: 'scroll'
  },
  productSellsTablePosition: {
    position: 'relative',
    right: 0,
    overflow: 'hidden',
    direction: 'rtl'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  headerText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  tableCell: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default ProductSells;