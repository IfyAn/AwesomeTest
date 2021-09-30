import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios'

const TestScreen=()=> {
  const api='http://www.omdbapi.com/?id=tt3896198&apikey=78c16f1e'
  const [state, setState] = useState({
    s:'Enter a movie...',
    results:[],
    selected:{}
  })

  const search=()=>{
    axios(api + '&s=' + state.s).then(({data})=>{
      let results=data.Search
      setState(prevState=>{
        return{...prevState, results}
      })
    })
  }
  const openPop=id=>{
    axios(api + '&i=' + id).then(({data})=>{
      let result=data
      console.log(result)
      setState(prevState=>{
        return{...prevState, selected: result}
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Title</Text>
      <TextInput 
        style={styles.searchBox}
        value={state.s}
        onChangeText={text=>setState(prevState=>{
          return{...prevState,s:text}
        })}
        onSubmitEditing={search}
      />
      <ScrollView style={styles.results}>
        {state.results.map(result=>(
          <TouchableOpacity key={result.imdbID} 
           onPress={()=>openPop(result.imdbID)}
          >
          <View style={styles.result}>
            <Image
              source={{uri:result.Poster}}
              resizeMode='stretch'
              style={{width:'100%', height:300}}
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
         </TouchableOpacity> 
        ))}
      </ScrollView>
      <Modal 
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != 'undefined')}
      >
        <View style={styles.popup}>
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{marginBottom:20}}>Rating:{state.selected.imdbRating}</Text>
          <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableOpacity
          onPress={()=>setState(prevState=>{
            return{...prevState, selected:{}}
          })}>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:'#223343',
    paddingTop:70,
    paddingHorizontal:20
  },
  title:{
    color:'#fff',
    textAlign:'center',
    fontSize:32,
    fontWeight:'700',
    marginBottom:20
  },
  searchBox:{
    //color:'#fff',
    backgroundColor:'#fff',
    fontSize:32,
    fontWeight:'300',
    marginBottom:40,
    width:'100%',
    borderRadius:8
  },
  results:{
    flex:1
  },
  result:{
    flex:1,
    marginBottom:20,
    width:'100%',
  },
  heading:{
    color:'#fff',
    backgroundColor:'#445567',
    fontSize:18,
    fontWeight:'700',
    padding:20,
  },
  popup:{
    padding:20
  },
  poptitle:{
    fontSize:24,
    fontWeight:'700',
    marginBottom:5
  },
  closeBtn:{
    padding:20,
    fontSize:24,
    fontWeight:'700',
    backgroundColor:'#2482C4'
  }
});

export default TestScreen;
