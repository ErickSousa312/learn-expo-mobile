import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useRef } from 'react'

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import apiAxios from '@/components/axiosApi';

export default function TabOneScreen() {
  const [latitude, setLatitude] = useState<string>()
  const [longitude, setLongitude] = useState<string>()
  const [WeatherDataData, setWeatherData] = useState<WeatherDataType>()
  const [error, setError] = useState('');
  const keyref = useRef<TextInput>(null)

  async function fetchWeather() {
    Keyboard.dismiss();
    if(!latitude||!longitude){
      setError('Longitude e latitude devem estar preenchidos!');
      return setTimeout(() => setError(''), 4000);
    }
    const response = await apiAxios.get(`weather?lon=${longitude}&lat=${latitude}`);
    console.log(response.data)
    if(response.status==200){
      return setWeatherData(response.data);
    }
    setError('Dados inválido');
    setTimeout(() => setError(''), 4000);
  }

  function clearInputs(){
    setLatitude('')
    setLongitude('')
    setWeatherData(undefined)
    if (keyref.current) {
      keyref.current.focus();
    }
  }

  useEffect(()=>{

  },[])

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'whites', marginTop:30}}>
        <Text style={styles.labelData1}>Consulta de clima</Text>
      </View>
      <TextInput 
          style={[styles.input]}
          placeholder="Digite a latitude"
          value={latitude}
          keyboardType='numeric'
          onChangeText={(text) => {
            setLatitude(text)
          }}
          cursorColor={'black'}
          inputMode="text"
          placeholderTextColor="black"
          ref={keyref}
          />
      <TextInput 
          style={[styles.input]}
          placeholder="Digite a Longitude"
          value={longitude}
          keyboardType='numeric'
          onChangeText={(text) => {
            setLongitude(text)
          }}
          cursorColor={'black'}
          inputMode="text"
          placeholderTextColor="black"
          />
      <View style={styles.divButtons}>
        <Pressable style={styles.buttom} onPress={()=>{
            fetchWeather()
          }} >
          <Text style={{color:'white', fontSize:20}} >Buscar Clima</Text>
        </Pressable>
      </View>

      <View style={{backgroundColor:'#f0f0f0', width:'100%', alignItems:'center'}}>
        {WeatherDataData && (
          <View style={{marginTop:15, alignItems:'flex-start', backgroundColor:'white', width:'90%', justifyContent:'center',
            paddingBottom:15, paddingTop:15, paddingLeft:15}}>
          <Text style={styles.labelData}>Temperatura: {WeatherDataData.main.temp}°C</Text>
          <Text style={styles.labelData}>Umidade: {WeatherDataData.main.humidity}%</Text>
          <Text style={styles.labelData}>Descrição: {WeatherDataData.weather[0].description}</Text>
          </View>
          
        )}
      </View>
      {error ? (
        <Text
          style={{
            color: 'red',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 15,
            fontSize: 17,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#f0f0f0'
  },
  divButtons:{
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#f0f0f0'
  },
  title: {
    justifyContent:'center',
    borderRadius:10,
    backgroundColor:'gray',
    paddingHorizontal:25,
    borderWidth:1,
    borderColor:'black',
    marginTop:10,
    fontSize: 18,
    width:'90%',
    color:'black'
  },
  input:{
    paddingLeft:15,
    marginTop:15,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    width:'90%',
    fontSize:17,
    paddingVertical:9,

  },
  labelData:{
    fontSize:17,
    backgroundColor:'white',
    color:'black'
  },
  labelData1:{
    fontSize:24,
    marginTop:18,
    backgroundColor:'#f0f0f0',
    color:'black',
    fontWeight:'bold'
  },
  labelMain:{
    fontSize:22,
    marginTop:18,
    backgroundColor:'white',
    color:'black'
  },
  labelError:{
    fontSize:18,
    marginTop:18,
    color:"red"
  },
  buttom:{
    marginTop:15,
    borderColor:'black',
    borderRadius:2,
    width:'90%',
    backgroundColor:'#2196f3',
    alignItems:'center',
    textAlign:'center',
    fontSize:17,
    paddingVertical:7,
    paddingHorizontal:5
  },
  buttom2:{
    marginTop:15,
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    width:100,
    backgroundColor:'red',
    alignItems:'center',
    textAlign:'center',
    fontSize:17,
    paddingVertical:10,
    paddingHorizontal:5
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '90%',
  },
});
