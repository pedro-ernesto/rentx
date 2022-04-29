import React from 'react';

import { Container, Title } from './styles';

interface Props{
  title: string;
  color?: string;
  onPress?: () => void; 
}

export default function Button({title,color, onPress}: Props){

  return (
    <Container onPress={onPress} color = {color}>
      <Title>{title}</Title>
    </Container>
  );
}

