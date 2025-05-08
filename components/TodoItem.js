import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export default function TodoItem({item, onComplete, onDelete}) {
  return (
    <View style={styles.item}>
      <View style={{flex: 8}}>
        <Text
          style={[
            styles.text,
            {textDecorationLine: item.completed ? 'line-through' : 'none'},
          ]}>
          {item.text}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <RectButton onPress={onComplete} style={[styles.button, {backgroundColor: item.completed ? 'green' : 'blue' }]}>
            <Text style={{color: '#fff', }}>{item.completed ? 'Undo' : 'Done'}</Text>
        </RectButton>
        <RectButton onPress={onDelete} style={styles.button}>
            <Text style={{color: '#fff', }}>{'Delete'}</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
    flex:1,
    flexDirection:'row'
  },
  text: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button:{
    padding: 10, 
    borderRadius: 5,
    alignItems: 'center', 
    backgroundColor:'red'
  }
});
