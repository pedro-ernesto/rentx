import React from 'react';
import { StatusBar } from 'react-native';

//letra maiuscula para ser usado como componente

import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { 
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

const Home: React.FC = () => {
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
    </Container>
  );
}

export default Home;