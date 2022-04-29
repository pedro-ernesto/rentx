import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import ConfirmButton from '../../components/ConfirmButton';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';


import { 
  Container,
  Content,
  Title,
  Message,
  Footer,

} from './styles';


const SchedulingComplete: React.FC = () => {
  const {width} = useWindowDimensions();

  const navigation = useNavigation<NavigationProps>();
  
  function handleConfirm() {
    navigation.navigate('Home')
  }

  type NavigationProps = {
    navigate:(screen:string) => void;
  }

  return (
  <Container>
    <StatusBar 
      barStyle={'light-content'}
      translucent
      backgroundColor='transparent'
    />
    <LogoSvg width={width}/>
    
    <Content>
      <DoneSvg width={80} height={80}/>
      <Title>Carro Alugado!</Title>

      <Message>
        Agora você só precisa ir {'\n'}
        até a concessionária {'\n'}
        pegar seu automóvel.
      </Message>
    </Content>

    <Footer>
      <ConfirmButton title='OK' onPress={handleConfirm}/>
    </Footer>
  </Container>

)}

export default SchedulingComplete;