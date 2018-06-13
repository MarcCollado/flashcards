import { Text } from 'react-native';
import styled from 'styled-components';

import { black } from './colors';

const LargeTitle = styled.Text`
  font-weight: normal;
  font-family: System;
  font-size: 34px;
  line-height: 41px;
  color: ${black};
`;

const Title1 = styled.Text`
  font-weight: normal;
  color: ${black};
  font-family: System;
  font-size: 28px;
  line-height: 34px;
`;

const Title2 = styled.Text`
  font-weight: normal;
  font-family: System;
  font-size: 22px;
  line-height: 28px;
  color: ${black};
`;

const Title3 = styled.Text`
  font-weight: normal;
  font-family: System;
  font-size: 20px;
  line-height: 25px;
  color: ${black};
`;

const Headline = styled.Text`
  font-weight: normal;
  font-family: System;
  font-size: 34px;
  line-height: 41px;
  color: ${black};
`;

const Body = styled.Text`
  font-weight: normal;
  font-family: System;
  font-size: 17px;
  line-height: 22px;
  color: ${black};
`;

export { LargeTitle, Body, };
