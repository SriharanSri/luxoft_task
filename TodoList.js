import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons.js';

const TodoList = ({filter, todos, complete, deleteList, editData}) => {
  const filteredTodos =
    filter === 'All'
      ? todos
      : filter === 'Active'
      ? todos.filter(todo => !todo.completed)
      : todos.filter(todo => todo.completed);

  return (
    <View>
      {filteredTodos && filteredTodos?.length > 0 ? (
        <FlatList
          data={filteredTodos}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    deleteList(index);
                  }}>
                  <Icon1 name="delete" size={16} color="#4F8EF7" />
                </TouchableOpacity>
                {filter === 'Active' && (
                  <TouchableOpacity onPress={() => complete(index)}>
                    <Icon2
                      name="checkmark-done-circle-outline"
                      size={20}
                      color="#4F8EF7"
                      style={{marginLeft: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textStyle}>No Records Found!</Text>
        </View>
      )}
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
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 100,
  },
});
export default TodoList;
