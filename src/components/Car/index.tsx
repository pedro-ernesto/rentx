import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

import { CarDto } from '../../dtos/CarDTO';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
 } from './styles';

interface Props {
  data: CarDto;
  onPress?: () => void;
}

export default function Car({ data, onPress } : Props){
  const MotorIcon = getAcessoryIcon(data.fuel_type);

  return (
  <Container onPress={onPress}>
    <Details>
      <Brand>{data.brand}</Brand>
      <Name>{data.name}</Name>

      <About>
        <Rent>
          <Period>{data.rent.period}</Period>
          <Price>{`R$ ${data.rent.price}`}</Price>
        </Rent>

        <Type>
          <MotorIcon />
        </Type>
      </About>
    </Details>

    <CarImage 
      source = {{ uri: data.thumbnail }}
      resizeMode='contain'
    />
  </Container>
  );
}
