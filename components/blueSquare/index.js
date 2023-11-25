import React from 'react';
import { View, StyleSheet } from 'react-native';

const BlueSquare = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: 'rgba(44,45,111,0.6)',  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,  
    elevation: 5,
  },
});

export default BlueSquare;