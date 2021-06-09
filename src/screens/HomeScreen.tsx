import React from 'react';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {HorizontalSlider} from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {isLoading, nowPlaying, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={{marginTop: top}}>
        {/* Main Carousel */}
        <View style={{height: 440}}>
          <Carousel
            data={nowPlaying}
            renderItem={({item}: any) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        {/* Polular Movies */}
        <HorizontalSlider title="At the cinema" movies={nowPlaying} />
        <HorizontalSlider title="Populars" movies={popular} />
        <HorizontalSlider title="topRated" movies={topRated} />
        <HorizontalSlider title="upcoming" movies={upcoming} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
