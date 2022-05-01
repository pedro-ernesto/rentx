import React, {useRef, useState} from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,

} from './styles'; 

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export default function ImageSlider({imagesUrl} : Props){
  const [imageIndex, setImageIndex] = useState<Number>(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    // index nunca será nulo, usa exclamação
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex
              key={String(index)}
              active = {index === imageIndex} 
            />
          ))
          
        }
      </ImageIndexes>


        <FlatList 
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage
              source={{uri: item}}
              resizeMode='contain'
              />
            </CarImageWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />

    </Container>
  );
}

