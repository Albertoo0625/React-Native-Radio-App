import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet ,Button} from 'react-native';
import trackData from './radioData';
import { useContext } from './useContext';


interface TrackData {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {setTrackData}=useContext();

  useEffect(()=>{
    setTrackData(trackData);
  },[]);

const handleSearch = () => {
  const filteredData = trackData.filter((item: TrackData) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  console.log(filteredData);
  setTrackData(filteredData);
};

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search"
      />
      <Button title='search' onPress={handleSearch}/>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    color: 'green',
  },
});

export default SearchScreen;
