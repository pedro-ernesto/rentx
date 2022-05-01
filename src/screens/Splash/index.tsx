import React, {useEffect} from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate

} from 'react-native-reanimated';

import { Container } from './styles'; 
import { useNavigation } from '@react-navigation/native';


const Splash: React.FC = () => {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return{
      opacity: interpolate(splashAnimation.value,
        //intervalos
        [0,50],
        //valor de opacidade no intervalos 
        [1,0],
        ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0,50],
            [0,-50],
            // respeitar limites
            Extrapolate.CLAMP
            ) 
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return{
      opacity: interpolate(splashAnimation.value,
        //intervalos
        [0,25,50],
        //valor de opacidade no intervalos 
        [0,.3,1],
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0,50],
            [-50,0],
            // respeitar limites
            Extrapolate.CLAMP
            ) 
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    //vai de 0 a 50 com a duração de 1 segundos e chama uma função de callback
    splashAnimation.value = withTiming(
      50,
      {duration: 1000},
      () => {
        //muda a thread de execução
        'worklet'
        runOnJS(startApp)()
      }
    )
  },[]);

  return (
    <Container>
      <Animated.View style={[brandStyle,{position: 'absolute'} ]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle,{position: 'absolute'}]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>

    </Container>
  );
}

export default Splash;