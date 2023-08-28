import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
const fecthNews = async () => {
  const API_KEY = "125b2d8a71bd4ed2a8d69f7e8a9d53a0";
  const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=125b2d8a71bd4ed2a8d69f7e8a9d53a0";
  try {
    //const response = await fetch(BASE_URL);
    //const data = await response.json();
    //if(response.status != 200){
      //throw new Error(data.message);
    //}
    const response = await axios.get(BASE_URL);
    return response.data.articles;
  } catch (error) {
    console.error("Error Fetching News", error);
    throw error;
  }
}
App = () => {
  const [articles, setArticle] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newArticle = await fecthNews();
        setArticle(newArticle);

      }
      catch (error) {
        setError(error.message);
        throw error;
      }
    }
    loadNews();
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={{color :"red"}}>Error:{error}</Text>}
      <FlatList
        data={articles}
        keyExtractor={(item) =>item.url}
        renderItem={({item})=>(
          <View>
            <Text style={{fontSize:18,fontWeight:"bold",backgroundColor:"#BB2525",padding:5,color:"#fff"}}>{item.title}</Text>
            <Text style={{fontStyle:"italic",backgroundColor:"#FF6969",color:"#fff"}}>{item.author}</Text>
            <Image source={{uri: item.urlToImage}} style={{width: 200, height: 200}}/>
            <Text style={{fontSize:16,color:"#141E46"}}>{item.description}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;