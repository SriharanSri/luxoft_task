import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const TodoItem = ({item, status}) => {
  return (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Icon
            name="edit"
            size={14}
            color="#4F8EF7"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon1 name="delete" size={14} color="#4F8EF7" />
        </TouchableOpacity>
        {!status && (
          <TouchableOpacity>
            <Icon1 name="delete" size={14} color="#4F8EF7" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TodoItem;
