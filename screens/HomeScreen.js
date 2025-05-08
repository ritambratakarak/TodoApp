import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';  

const STORAGE_KEY = '@todos';

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTodos(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load todos', e);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (e) {
        console.error('Failed to save todos', e);
      }
    };
    saveTodos();
  }, [todos]);


  const addTodo = text => {
    setTodos(prev => [
      ...prev,
      {id: Date.now().toString(), text, completed: false},
    ]);
  };

  const toggleComplete = id => {
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? {...item, completed: !item.completed} : item,
      ),
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <TodoInput onAdd={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem
            item={item}
            onComplete={() => toggleComplete(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
});
