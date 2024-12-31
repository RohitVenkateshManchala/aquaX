import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  ScrollView,
  Divider,
  Center,
  Icon,
  Select,
  CheckIcon,
} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const StockInScreen = (props: any) => {
  const { selectedOption } = props.route.params;

  // State variables for the form fields
  const [date, setDate] = useState(new Date());
  const [cartonQRCode, setCartonQRCode] = useState('');
  const [locationQRCode, setLocationQRCode] = useState('');
  const [masterCartons, setMasterCartons] = useState('');
  const [incharge, setIncharge] = useState('');
  const [stockType, setStockType] = useState('Repacking'); // Default value for stock type

  // State for showing QR Code Scanner
  const [scanningCarton, setScanningCarton] = useState(false);
  const [scanningLocation, setScanningLocation] = useState(false);
  
  // State for handling date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle date change
  const handleDateChange = (event: any, selectedDate: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!cartonQRCode || !locationQRCode || !masterCartons || !incharge || !stockType) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    console.log({
      date,
      cartonQRCode,
      locationQRCode,
      masterCartons,
      incharge,
      stockType,
    });

    Alert.alert("Success", "Form submitted successfully!");
  };

  // Handle QR code scan
  const handleQRCodeScan = (type: string, e: any) => {
    if (type === 'carton') {
      setCartonQRCode(e.data);
      setScanningCarton(false);
    } else if (type === 'location') {
      setLocationQRCode(e.data);
      setScanningLocation(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Stock In - {selectedOption}</Text>

      {/* Date Field */}
      <Box mb={4}>
        <Text>Date</Text>
        <Button onPress={() => setShowDatePicker(true)} variant="outline" w="full">
          <Text>{date.toDateString()}</Text>
        </Button>
        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </Box>

      {/* Carton QR Code Scanner */}
      <Box mb={4}>
        <Text>Carton QR Code</Text>
        <HStack space={3} alignItems="center">
          <Button onPress={() => setScanningCarton(true)} variant="outline">
            <Icon as={require('react-native-vector-icons/MaterialIcons')} name="qr-code-scanner" size={5} />
            <Text ml={2}>{cartonQRCode || 'Scan QR'}</Text>
          </Button>
        </HStack>
      </Box>

      {/* Location QR Code Scanner */}
      <Box mb={4}>
        <Text>Location QR Code</Text>
        <HStack space={3} alignItems="center">
          <Button onPress={() => setScanningLocation(true)} variant="outline">
            <Icon as={require('react-native-vector-icons/MaterialIcons')} name="qr-code-scanner" size={5} />
            <Text ml={2}>{locationQRCode || 'Scan QR'}</Text>
          </Button>
        </HStack>
      </Box>

      {/* Master Cartons */}
      <Box mb={4}>
        <Text>Master Cartons</Text>
        <Input
          value={masterCartons}
          onChangeText={setMasterCartons}
          placeholder="Enter master cartons"
          w="full"
          variant="filled"
        />
      </Box>

      {/* Incharge */}
      <Box mb={4}>
        <Text>Incharge</Text>
        <Input
          value={incharge}
          onChangeText={setIncharge}
          placeholder="Enter incharge name"
          w="full"
          variant="filled"
        />
      </Box>

      {/* Stock Type Picker */}
      <Box mb={4}>
        <Text>Stock Type</Text>
        <Select
          selectedValue={stockType}
          onValueChange={setStockType}
          placeholder="Select Stock Type"
          w="full"
        >
          <Select.Item label="Repacking" value="Repacking" />
          <Select.Item label="Manufacturing" value="Manufacturing" />
          <Select.Item label="Returns" value="Returns" />
        </Select>
      </Box>

      {/* Submit Button */}
      <Button onPress={handleSubmit} w="full" mb={4}>
        Submit
      </Button>

      {/* QR Code Scanner for Carton */}
      {scanningCarton && (
        <QRCodeScanner
          onRead={(e) => handleQRCodeScan('carton', e)}
          topContent={<Text style={styles.qrScannerText}>Scan Carton QR Code</Text>}
          bottomContent={
            <Button onPress={() => setScanningCarton(false)} variant="outline">
              Close Scanner
            </Button>
          }
        />
      )}

      {/* QR Code Scanner for Location */}
      {scanningLocation && (
        <QRCodeScanner
          onRead={(e) => handleQRCodeScan('location', e)}
          topContent={<Text style={styles.qrScannerText}>Scan Location QR Code</Text>}
          bottomContent={
            <Button onPress={() => setScanningLocation(false)} variant="outline">
              Close Scanner
            </Button>
          }
        />
      )}
    </ScrollView>
  );
};

export default StockInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrScannerText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
