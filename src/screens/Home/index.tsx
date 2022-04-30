import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';

import {Ionicons} from '@expo/vector-icons'

//letra maiuscula para ser usado como componente

import { RFValue } from 'react-native-responsive-fontsize';

import { CarDto } from '../../dtos/CarDTO';

import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import Car from '../../components/Car';

import Load from '../../components/Load';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';
import { useTheme } from 'styled-components';

type NavigationProps = {
  navigate:(screen:string,car:object) => void;
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();

  const carData = {
    brand:'audi',
    name:'RS 5 Coupé',
    rent:{
      period:'Ao dia',
      price:120, 
    },
    thumbnail: 'https://www.pngkey.com/png/full/383-3833840_rs-5-coup-price-from-audi-rs5-png.png'
  }
  
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
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? <Load/> :
        <CarList
          data={cars}
          keyExtractor = {item => String(item.id)}
          renderItem={({item}) => 
          <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
      }
      
      <MyCarsButton onPress={handleOpenCars}>
        <Ionicons name='ios-car-sport' size = {32} color = {theme.colors.shape}/>
      </MyCarsButton>
    </Container>
  );
}

export default Home;