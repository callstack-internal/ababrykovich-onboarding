import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

type DetailsPropertyProps = {
  name: string;
  value: string | number;
};

const DetailsListItem = ({ name, value }: DetailsPropertyProps) => {
  return (
    <>
      <View style={styles.separator} />
      <View style={styles.detailsSubListItem}>
        <Text style={styles.detailsSubListItemName}>{name}</Text>
        <Text style={styles.detailsSubListItemValue}>{value}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  detailsSubListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
  },
  detailsSubListItemName: {
    fontSize: 18,
  },
  detailsSubListItemValue: {
    fontSize: 18,
    color: 'gray',
  },
});

export default DetailsListItem;