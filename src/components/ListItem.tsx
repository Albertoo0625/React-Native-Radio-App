import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import SearchScreen from './Search';
import Item from './Item';
import { useContext } from './useContext';


const ListItem = () => {
  const {trackData}=useContext();
  
  return (
    <>
      <SearchScreen />
      <View>
      <FlatList 
      data={trackData} 
      renderItem={({item}:any) => (
      <Item  
      id={item.id}
      url={item.url}
      title={item.title}
      artist={item.artist}
      artwork={item.artwork}
    />
  )}
/> 
      </View>
    </>
  );
};

export default ListItem;