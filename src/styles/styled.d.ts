import 'styled-components';
import theme from './theme';

//tipagem do tema

declare module 'styled-components'{
  type ThemeType = typeof theme;

  // defaulttheme é o que styled components usa
  export interface DefaultTheme extends ThemeType {}
}