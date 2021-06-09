import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getimageColors} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {isLoading, nowPlaying, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColor = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getimageColors(uri);
    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColor(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  return (
    <GradientBackground>
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
              onSnapToItem={index => getPosterColor(index)}
            />
          </View>

          {/* Polular Movies */}
          <HorizontalSlider title="At the cinema" movies={nowPlaying} />
          <HorizontalSlider title="Populars" movies={popular} />
          <HorizontalSlider title="topRated" movies={topRated} />
          <HorizontalSlider title="upcoming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
