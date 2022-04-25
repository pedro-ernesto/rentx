import React from 'react';
import { StatusBar } from 'react-native';

//letra maiuscula para ser usado como componente

import Logo from '../../assets/logo.svg';

import { 
  Container,
  Header 
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
        
      </Header>
    </Container>
  );
}

export default Home;