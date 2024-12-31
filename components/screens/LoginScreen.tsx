import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginScreen = (props: any) => {
  const bg1 = require('../images/bg1.jpg');
  const logo = require('../images/gatex.png');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      props.navigation.navigate('home', {data: {username: 'admin'}});
    } else {
      setErrorMessage('Invalid username or password');
      setVisible(true);
    }
  };

  const handlePress = async () => {
    const url = 'https://www.schemaxtech.com/';
    try {
      await Linking.openURL(url);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Safely access message
      } else {
        setErrorMessage('An unknown error occurred');
      }
      console.error('An error occurred', error);
    }
  };

  return (
    <ImageBackground source={bg1} style={styles.background}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={logo} style={styles.logo} />
          {/* <Text style={styles.title}>PassXpert</Text> */}
          {/* Username input */}
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            autoCapitalize="none"
            textColor="black"
            left={<TextInput.Icon icon={'account'} color="#4CAF50" />}
            style={styles.input}
          />

          {/* Password input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            autoCapitalize="none"
            textColor="black"
            left={<TextInput.Icon icon="lock" color="#4CAF50" />}
            right={
              <TextInput.Icon
                onPress={() => setShowPassword(!showPassword)}
                icon={showPassword ? 'eye' : 'eye-off'}
              />
            }
            style={styles.input}
          />

          {/* Login button */}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            icon={() => <AntDesign name="login" size={20} color="#fff" />}>
            Login
          </Button>

          {/* Company name */}
          <TouchableOpacity onPress={handlePress} style={{marginTop: 25}}>
            <Text style={{textAlign: 'center', fontSize: 9}}>Powered by</Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: '#00BFFF',
                fontSize: 16,
              }}>
              Schemax
            </Text>
          </TouchableOpacity>
        </View>

        {/* Snackbar for displaying error messages */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false);
            },
          }}
          duration={Snackbar.DURATION_SHORT}
          style={styles.snackbar}>
          {errorMessage}
        </Snackbar>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: '73%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#d32f2f', // Red background to indicate error
  },
});