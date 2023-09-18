import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [text, setText] = useState('')

  const [list, setList] = useState([])

  const clearList = () => {
    setList([])
  }

  //her gemmes teksten i listen.
  function saveToListOnPress() {
    setList([...list, text+'\n'])
    
  }

  return (
    <View style={styles.container}>

      <TextInput placeholder='Ny Note' onChangeText={(txt)=> setText(txt)}/>
      <Button title='Tilføj' onPress={saveToListOnPress}/>

      <Button title='Fjern' onPress={clearList}/>


    <Text>{list}</Text>


    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
