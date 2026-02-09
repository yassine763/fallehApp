import React from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello, React Native!</Text>
      <Button title="Click Me" onPress={() => alert('Button Clicked')} />
    </View>
  );
}

export default App;
