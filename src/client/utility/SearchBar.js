import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerTitleColor } from '../../../GlobalStyles';

const SearchBar = ({ term, onTermChange }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Ionicons name="ios-search" style={styles.iconStyle} />
      <TextInput
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={newTerm => onTermChange(newTerm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'MerriWeather',
    color: headerTitleColor
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
    color: headerTitleColor
  }
});

export default SearchBar;
