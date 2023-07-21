import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import TodoList from './TodoList.js';
import Icon from 'react-native-vector-icons/MaterialIcons.js';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [arrData, setArrDAta] = useState([]);
  const [disable, setDisable] = useState(false);
  const handleFilterChange = filter => setFilter(filter);

  const handleAdd = input => {
    arrData.push({title: input, completed: false});
    arrData.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setModalVisible(false);
    setInput('');
  };

  const complete = index => {
    arrData[index].completed = true;
    setArrDAta([...arrData]);
  };
  const deleteList = index => {
    arrData.splice(index, 1);
    setArrDAta([...arrData]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>TODO List</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity onPress={() => handleFilterChange('All')}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Active')}>
            <Text style={styles.filterText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Completed')}>
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
        </View>
        <TodoList
          filter={filter}
          todos={arrData}
          complete={complete}
          deleteList={deleteList}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Todo </Text>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={value => {
                setInput(value);
              }}
              placeholder="Enter task"></TextInput>
            <View style={styles.buttongroup}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={input.length < 1}
                onPress={() => handleAdd(input)}
                style={[
                  styles.button,
                  {backgroundColor: input.length < 1 ? '#627ea1' : '#0a71f2'},
                ]}>
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floating}>
        <Icon name="add-task" size={30} color="#01a699" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttongroup: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#cf6e5d',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 20,
  },
  floating: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 30,
    right: 20,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default App;
