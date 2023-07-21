import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import TodoList from './TodoList.js';
import {Provider, Button, InputItem} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons.js';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [arrData, setArrDAta] = useState([]);
  const handleFilterChange = filter => setFilter(filter);

  const handleAdd = input => {
    arrData.push({title: input, completed: false});
    arrData.sort((a, b) => {
      return a.title.localeCompare(b.title); // Sort Ascending
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
  // const editData = (update, index) => {
  //   console.log(update, index);
  // };
  return (
    // <Provider>
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>TODO List</Text>
        {/* <Divider /> */}
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
          // editData={editData}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Todo </Text>
            <InputItem
              style={{
                borderRadius: 3,
                borderColor: 'grey',
                borderWidth: 1,
                padding: 10,
              }}
              clear
              value={input}
              onChange={value => {
                setInput(value);
              }}
              placeholder="Enter task"></InputItem>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Button
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Button>
              <Button
                style={[styles.button, styles.buttonAdd]}
                onPress={() => handleAdd(input)}>
                <Text style={styles.textStyle}>Add</Text>
              </Button>
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
    // </Provider>
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
    borderRadius: 10,
    width: 100,
    // padding: 10,
    // elevation: 2,
  },
  buttonAdd: {
    backgroundColor: '#627ea1',
  },
  buttonClose: {
    backgroundColor: '#d91809',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
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
