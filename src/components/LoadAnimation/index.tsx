import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/load_animated.json';

import { Container } from './styles';

const LoadAnimation: React.FC = () => {
  return (
  <Container>
    <LottieView 
      source={loadingCar}
      autoPlay
      style={{height: 200 }}
      resizeMode='contain'
      loop
    />
  </Container>
  );
}

export default LoadAnimation;