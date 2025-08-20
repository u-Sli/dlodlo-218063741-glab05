import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };


  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
      >
        <Text style={[styles.checkbox, item.done && styles.checked]}>
          {item.done ? '✓' : ''}
        </Text>
        <Text style={[styles.taskText, item.done && styles.taskDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Volunteer Task Tracker</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          style={styles.taskList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No tasks yet. Add a task to get started!</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 4,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 20,
  },
  checked: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});