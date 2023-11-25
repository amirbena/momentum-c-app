import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlueSquare from '../blueSquare';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const TotalBought = () => {
  const { t } = useTranslation();
  const { totalSells } = useSelector(state => state.sells);

  // TODO: EXTRACT TOTAL BOUGHT INTO 

  return (
    <BlueSquare style={styles.totalBoughtPosition}>
      <View style={styles.orderPosition}>
        <Text style={styles.totalBoughtHeaderTitle}>{t('totalBought.title')}</Text>
        <Text style={styles.totalBoughtContent}>{totalSells}</Text>
      </View>
    </BlueSquare>
  );
};

const styles = StyleSheet.create({
  totalBoughtPosition: {
    position: 'relative',
    top: 150,
    right: 0,
    width: 358,
    height: 167,
    flexShrink: 0,
  },
  orderPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalBoughtHeaderTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 24,
    top: 0,
  },
  totalBoughtContent: {
    color: '#FFF',
    top: 0,
    fontSize: 45,
    fontWeight: '400',
  },
});

export default TotalBought;