import React from 'react';


import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';
import Button from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import { Container,
  Header,
  CarImages,
  Content,
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

const CarDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton onPress={()=>{}}/>
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://www.pngkey.com/png/full/383-3833840_rs-5-coup-price-from-audi-rs5-png.png']}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lambo</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name = "380Km/h" icon={SpeedSvg} />
          <Accessory name = "3.2s" icon={AccelerationSvg} />
          <Accessory name = "800 HP" icon={ForceSvg} />
          <Accessory name = "Gasolina" icon={GasolineSvg} />
          <Accessory name = "Auto" icon={ExchangeSvg} />
          <Accessory name = "2 pessoas " icon={PeopleSvg} />
        </Accessories>

        <About>
          Automóvel pika pika pika brabo brabo brabo, pra pra pra pra pra pra.
        </About>
      </Content>

      <Footer>
        <Button title = 'Confirmar'/>
      </Footer>
    </Container>
  );
}

export default CarDetails;