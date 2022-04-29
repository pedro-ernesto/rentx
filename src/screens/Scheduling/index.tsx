import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

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

  type NavigationProps = {
    navigate:(screen:string) => void;
  }

const Scheduling: React.FC = () => {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProps>();
  
  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails')
  }
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
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

export default Scheduling;