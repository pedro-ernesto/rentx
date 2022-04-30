import React, { useEffect, useState } from 'react';

import { Container, Header,Title,SubTitle,
   Appointments, 
   Content, 
   AppointmentsTitle,
   AppointmentsQuantity,
   CarWrapper,
   CarFooter,
   CarFooterTitle,
   CarFooterPeriod,
   CarFooterDate, 
  } from './styles';

   import {AntDesign} from '@expo/vector-icons';

import { CarDto } from '../../dtos/CarDTO';
import api from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import BackButton from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Car from '../../components/Car';
import Load from '../../components/Load';


type NavigationProps = {
  navigate:(screen:string,car:object) => void;
  goBack:() => void;
}

interface CarProps {
  id: string;
  user_id: string;
  car: CarDto;
  startDate: string;
  endDate: string;
}


const MyCars: React.FC = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {


    async function fetchCars(){
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }

    fetchCars();
  },[])
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

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      { 
        loading ? <Load/> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem= {({item}) => (
              <CarWrapper>
                <Car data = {item.car}/>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          
          />
        </Content>
      }
    </Container>
  );
}

export default MyCars;