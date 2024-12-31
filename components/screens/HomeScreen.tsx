import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Modal, Button, Radio} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const HomeScreen = (props: any) => {
  const bg2 = require('../images/bg2.jpg');

  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    'Repacking',
    'Re Processing',
    'Re Work',
    'Lab Samples',
    'Transfers',
    'Fresh production',
    'Product Purchases',
  ];

  const handleConfirm = () => {
    setShowModal(false);
    props.navigation.navigate('StockInScreen', {selectedOption});
  };

  return (
    <ImageBackground source={bg2} style={styles.background}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.container}>
        <Text style={styles.title}>MENU</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowModal(true)}>
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            style={styles.gradient}>
            <Text style={styles.cardText}>Stock In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => props.navigation.navigate('StockOutScreen')}>
          <LinearGradient
            colors={['#2196F3', '#42A5F5', '#1E88E5']}
            style={styles.gradient}>
            <Text style={styles.cardText}>Stock Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select Option</Modal.Header>
          <Modal.Body>
            <Radio.Group
              name="stockOptions"
              value={selectedOption}
              onChange={nextValue => setSelectedOption(nextValue)}>
              {options.map(option => (
                <Radio value={option} my={2} key={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onPress={handleConfirm}>Confirm</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    width: width * 0.85,
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
