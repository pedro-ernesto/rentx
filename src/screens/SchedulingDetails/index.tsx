import React, { useEffect, useState } from 'react';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Accessory from '../../components/Accessory';
import Button from '../../components/Button';

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
import { CarDto } from '../../dtos/CarDTO';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import api from '../../services/api';


 type NavigationProps = {
  navigate:(screen:string) => void;
  goBack:() => void;
}

interface Params {
  car: CarDto;
  dates: string[];
}

interface RentalPeriod{
  start: string;
  end: string;
}

const SchedulingDetails: React.FC = () => {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading,setLoading] = useState(false);
  const theme = useTheme();
  const route = useRoute();
  const {car, dates} = route.params as Params; 

  const navigation = useNavigation<NavigationProps>();

  const rentTotal = Number(dates.length) * car.rent.price;
  
  async function handleConfirmRental() {
    setLoading(true); 
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: rentalPeriod.start,
      endDate: rentalPeriod.end
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,

    })
    .then(() => navigation.navigate('SchedulingComplete'))
    .catch(() => Alert.alert('Não foi possível confirmar o agendamento'))
    .finally(() => setLoading(false))
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
        {
          car.accessories.map(accessory => 
            (<Accessory 
              key = {accessory.type}
              name = {accessory.name}
              icon={getAcessoryIcon(accessory.type)} />)
            )
        }
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title = 'Alugar Agora'
          color = {theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
          />
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;