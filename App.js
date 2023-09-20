import { app, database } from './firebase';
import {collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import { useCollection} from 'react-firebase-hooks/firestore';
import * as ImagePicker from 'expo-image-picker';
import {storage} from './firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';


export default function App() {

  const [text, setText] = useState('')
  const [editObject, setObject] = useState(null)
  const [editObj, setEditObj] = useState(null)
  const [imagePath, setImagePath] = useState(null)
  const Stack = createNativeStackNavigator();
  
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))



  //Her sendes det som skrives ind til firebase serveren og der gemmes det som skrives
 async function buttonHandler(){
  try{
   await addDoc(collection(database, "notes"), {
      text: text
    })
  }catch(e){
    console.log(e)
  }}

  

  async function  deleteDocument(id){
    await deleteDoc(doc(database, "notes", id));
  }

  async function saveUpdate(id){
    await updateDoc(doc(database, "notes", editObj.id), {
      text: text
    })
    if(imagePath){
      uploadImage()
    }
    setText("")
    setEditObj(null)
  }

  function viewUpdateDialog(item){
      setEditObj(item)
      setText(item.text) //undgår at gemme tomme felter
  }

  async function launchImagePicker(){

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    })
    if(!result.canceled){
      //vis billedet
          setImagePath(result.assets[0].uri)
    }
  }

  async function uploadImage(){
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const storageRef = ref(storage, editObj.id +'.jpg')
    uploadBytes(storageRef, blob).then((snapshot) => {
      alert("image uploaded")
    })
  }

  async function downloadImage(id){

    getDownloadURL(ref(storage, id +'.jpg')).then((url) => {
      setImagePath(url)
    }).catch((error) => {
      console.log(error)
    })
  }



  /*<Image style={{width:200, height:200}} source={{uri:imagePath}}/>
        <Button title='Download Image' onPress={downloadImage}/>
        <Button title='Pick Image' onPress={launchImagePicker}/>
        <Button title='Upload Image' onPress={uploadImage}/>*/


  return (
    <View style={styles.container}>
    
    {editObj &&
     <View>
      <TextInput  defaultValue={editObj.text} onChangeText={(txt) => setText(txt)}/>
      <Text onPress={launchImagePicker}>Add Image</Text>
      <Text onPress={saveUpdate}>Save</Text>
     </View>
     }
      <Image source={{uri:imagePath}} style={{width:200, height:200}} />


      <TextInput style={styles.textInput}  onChangeText={(txt) => setText(txt)} />
      <Button title='Press Me' onPress={buttonHandler} ></Button>
      <FlatList
        data={data}
        renderItem={(note) =>  
        <View>
        <Text onPress={() => downloadImage(note.item.id)}>{note.item.text}</Text>
        <Text onPress={() => deleteDocument(note.item.id)}>Delete</Text>
        <Text onPress={() => viewUpdateDialog(note.item)}>Update</Text>
         </View>
        }
        />
      
       
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:200
  },
  textInput:{
    backgroundColor:'lightblue',
    minWidth: 200
  }
})