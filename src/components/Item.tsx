import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer,{ usePlaybackState,useTrackPlayerEvents } from 'react-native-track-player';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';

interface TrackData {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

const Item = ({ id, url, title, artist, artwork }: TrackData) => {
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      console.log('Track player ready');
    }
    setupPlayer();

    return () => {
      async function reset() {
        await TrackPlayer.reset();
      }
      reset();
    };
  }, []);

  const handlePlay = async () => {
    try {
      if (playing) {
        await TrackPlayer.pause();
        setPlaying(false);
      } else {
        console.log(id, url, title, artist, artwork);
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Permission',
            message:
              'App needs permission to access your device audio to play music.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) { 

          const result=await axios.post("https://gleaming-frangipane-d8c0d8.netlify.app/.netlify/functions/handlerequest",{url},
          {headers:{
            'Content-Type':'application.json'
          }});
          console.log(result.data);
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: id,
            url: url,
            title: title,
            artist: artist,
            artwork: artwork,
          }).then(async()=>{
            await TrackPlayer.play().then(()=>{
              setPlaying(true); 
            }).finally(()=>{
              // Alert.alert(
              //   'Track playback state',
              //   `Loading the track: ${playbackState}`,
              // );
            });  
          });
        
        } else {
          console.log('Audio permission denied');
        }
      
      }
    } catch (error:any) {
      console.log('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text>{title}</Text>
        <View style={styles.button}>
          <Button title={playing ? 'Pause' : 'Play'} onPress={handlePlay} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Item;
