import React from 'react';
import { useTheme } from 'styled-components';

import { StatusBar } from 'react-native';

import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { Container,Header,Title,
  RentalPeriod,
  DateTitle,
  DateInfo,
  DateValue,
  Content,
  Footer } from './styles';


const SchedulingDetails: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton 
        onPress={()=>{}}
        color = {theme.colors.shape}
        />


        <Title>
          Escolha a {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected = {false}></DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected = {false} ></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      
      <Content>
        <Calendar/>
      </Content>
      
      <Footer>
        <Button title="Confirmar"/>
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;