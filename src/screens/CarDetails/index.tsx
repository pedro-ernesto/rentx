import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated , {
  useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate
} from 'react-native-reanimated';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';
import Button from '../../components/Button';

import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

import { CarDto } from '../../dtos/CarDTO';

import { Container,
  Header,
  CarImages,  
  Details,
  Description,
  Brand,
  Price,
  Name,
  Period,
  Rent,
  About,
  Accessories,
  Footer,

 } from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';


type NavigationProps = {
  navigate:(screen:string,car:object) => void;
  goBack:() => void;
}

interface Params {
  car: CarDto;
}

const CarDetails: React.FC = () => {
  const route = useRoute();
  const {car} = route.params as Params; 
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle( () => {
    return {
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle( () => {
    return {
      opacity: interpolate (
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });
  
  function handleConfirmRental() {
    navigation.navigate('Scheduling', {car})
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />

      <Animated.View 
        style={[headerStyleAnimation, styles.header, {backgroundColor: theme.colors.background_secondary}]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>

        <Animated.View style = {[sliderCarsStyleAnimation,]}>
          <CarImages>
          <ImageSlider imagesUrl={car.photos}/>
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() +160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        /*16 frames por segundo (1000/60)*/
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
        {
          car.accessories.map(accessory => 
            (<Accessory 
              key = {accessory.type}
              name = {accessory.name}
              icon={getAcessoryIcon(accessory.type)} />)
            )
        }
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title = 'Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create ({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})

export default CarDetails;