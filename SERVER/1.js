import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
      {
        title: 'Wi-Fi Access Permission',
        message: 'This app needs access to your Wi-Fi information.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

// requestLocationPermission(); // Call this before accessing Wi-Fi information





async function main() {
  const enabled =  WifiManager.isEnabled();
  // if(!enabled){
    console.log(`WifiManager not ` + enabled ); 
  // }else{
    // console.log('WifiManager is enabled');
  // }


  try {
    const currentSSID = await WifiManager.disconnectFromSSID('VoidSoft');
    console.log(`Your current Wi-Fi SSID is ${currentSSID}`);
  } catch (error) {
    console.log("Cannot get current SSID:", error.message);
  }
}





const ssid = "Void Soft";
const password = "03027663889";
const isWep = false; // Assuming it's WPA2
const isHidden = false; // Assuming the network is not hidden

main(ssid, password, isWep, isHidden);
