import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import InputField from './InputField';

export default function TodoInput({onAdd}) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <View style={styles.inputContainer}>
      <View style={{flex: 7}}>
        <InputField label="Add new todo" value={text} onChangeText={setText} />
      </View>
      <View style={{flex:2}}>
        <RectButton onPress={handleAdd} style={styles.button}>
            <Text style={{color: 'white'}}>ADD</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems:'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    height:40,
    justifyContent:'flex-end',
    marginTop:10
  },
});
