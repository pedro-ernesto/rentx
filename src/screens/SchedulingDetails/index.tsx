import React from 'react';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';


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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceDetails,
  RentalPriceTotal,


 } from './styles';


const CarDetails: React.FC = () => {
  const theme = useTheme();

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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>20/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title = 'Alugar Agora'
          color = {theme.colors.success}
          />
      </Footer>
    </Container>
  );
}

export default CarDetails;