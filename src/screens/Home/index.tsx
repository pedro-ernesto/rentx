import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { TouchableOpacity, BackHandler } from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue, useAnimatedStyle, useAnimatedGestureHandler
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

import {Ionicons} from '@expo/vector-icons'

//letra maiuscula para ser usado como componente

import { RFValue } from 'react-native-responsive-fontsize';

import { CarDto } from '../../dtos/CarDTO';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import Car from '../../components/Car';

import LoadAnimation from '../../components/LoadAnimation';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';


type NavigationProps = {
  navigate:(screen:string,car:object) => void;
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return{
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx:any){
      ctx.positionX = positionX.value;
      ctx.positionX = positionY.value;

    },
    onActive(event, ctx:any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionX + event.translationY;
    },
    onEnd(){

    }
  });
  
  function handleCarDetails(car:CarDto) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenCars() {
    navigation.navigate('MyCars',{});
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchCars();

  },[]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () =>{
      return true;
    })
  },[]);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          { !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {loading ? <LoadAnimation/> :
        <CarList
          data={cars}
          keyExtractor = {item => String(item.id)}
          renderItem={({item}) => 
          <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
      }
      
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style= {[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated 
          style={[styles.button, {backgroundColor: theme.colors.main}]} 
          onPress={handleOpenCars
          }>
            <Ionicons name='ios-car-sport' size = {32} color = {theme.colors.shape}/>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create ({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Home;