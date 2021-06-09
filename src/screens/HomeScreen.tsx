import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useMovies} from '../hooks/useMovies';

const HomeScreen = () => {
  const {moviesNowPlaying, isLoading} = useMovies();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  console.log(moviesNowPlaying[5]?.title);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
