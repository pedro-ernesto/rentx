import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  onPress?: () => void; 
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({title,color,disabled = false,loading=false, onPress}: Props){
  const theme = useTheme();

  return (
    <Container 
    onPress={onPress} 
    color = {color} 
    disabled= {disabled}
    style={{opacity: (disabled || loading ===true) ? 0.5 : 1}}
    >
      {
        loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
      } 
    </Container>
  );
}

