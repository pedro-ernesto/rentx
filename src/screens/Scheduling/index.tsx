import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert, StatusBar } from 'react-native';

import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {Calendar, DayProps, generateInterval, MarkedDateProps} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { Container,Header,Title,
  RentalPeriod,
  DateTitle,
  DateInfo,
  DateValue,
  Content,
  Footer } from './styles';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDto } from '../../dtos/CarDTO';

type NavigationProps = {
  navigate:(screen:string,car:object) => void;
  goBack:() => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDto;
}

const Scheduling: React.FC = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const {car} = route.params as Params; 
  
  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo para alugar.')
    }else{
      navigation.navigate('SchedulingDetails',{
        car,
        dates: Object.keys(markedDates)
      })
    }
    
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date:DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate; 
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }
    console.log(start);
    console.log(end);
    setLastSelectedDate(end);
    const interval = generateInterval(start,end);
    console.log(interval);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })

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
        onPress={handleBack}
        color = {theme.colors.shape}
        />


        <Title>
          Escolha a {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected = {!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected = {!!rentalPeriod.endFormatted} >{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

export default Scheduling;