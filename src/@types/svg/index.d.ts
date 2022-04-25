declare module "*.svg"{
  import React from "react";
  import { SvgProps } from "react-native-svg";
  // é um componente funcional (React.FC) com as propriedades SVG
  const content: React.FC<SvgProps>;
  export default content;
}