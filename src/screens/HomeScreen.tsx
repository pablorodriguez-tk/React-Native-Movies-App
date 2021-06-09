import React from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {moviesNowPlaying, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <View style={{marginTop: top}}>
      <View style={{height: 440}}>
        <Carousel
          data={moviesNowPlaying}
          renderItem={({item}: any) => <MoviePoster movie={item} />}
          sliderWidth={windowWidth}
          itemWidth={300}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
