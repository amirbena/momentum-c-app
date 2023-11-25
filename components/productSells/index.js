import React from 'react';
import { View, Text } from 'react-native';
import BlueSquare from '../blueSquare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ProductSells = () => {
  const { t } = useTranslation();

  //TODO: EXTRACT EXACT NEW PRICES FROM SLICE

  const { sellsToday } = useSelector((state) => state.sells);

  return (
    <BlueSquare style={styles.productSellsPosition}>
      <View style={styles.productSellsTablePosition}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>{t('productSells.sku')}</Text>
          <Text style={styles.headerText}>{t('productSells.productName')}</Text>
          <Text style={styles.headerText}>{t('productSells.productPrice')}</Text>
        </View>
        {sellsToday.map(({ sku, name, price }, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{sku}</Text>
            <Text style={styles.tableCell}>{name}</Text>
            <Text style={styles.tableCell}>{price}</Text>
          </View>
        ))}
      </View>
    </BlueSquare>
  );
};

const styles = {
  productSellsPosition: {
    width: 358,
    height: 349,
    flexShrink: 0,
    marginTop: 200,
    marginRight: 0,
    paddingBottom: 40,
  },
  productSellsTablePosition: {
    position: 'relative',
    right: 0,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  headerText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '400',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    paddingVertical: 8,
  },
  tableCell: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
  },
};

export default ProductSells;