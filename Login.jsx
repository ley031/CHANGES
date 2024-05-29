import { View, Text, Image, Pressable, Dimensions, SafeAreaView, Alert, BackHandler } from 'react-native';
import React, { useEffect } from 'react' 
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "./../../GlobalStyles";
import Button from '../../components/Button';
import { createNotifications, useNotifications } from 'react-native-notificated';

export default function Welcome ({ navigation, route }) {
    
    const { NotificationsProvider } = createNotifications();
    const { notify } = useNotifications();

    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        notify('info', {
            params: {
                title: 'Welcome to Servicita',
                description: 'Login or Register to get started.'
            },
        });
      }, [])

      const handleBackPress = () => {
        Alert.alert(
          "Exit App",
          "Exiting the application?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Exit", onPress: () => BackHandler.exitApp() }
          ]
        );
        return true;
      }
    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
          return() => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          }
        })
      )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite}}>
            <View style = {{alignItems: 'center'}}>
            <NotificationsProvider/>
            </View>
            <LinearGradient
                style={{
                    flex: 1
                }}
                colors={[Color.colorPrimary, Color.colorPrimary]}
            >
                    <View style={{flex: 1}}>
                        <View>
                            <Image
                                source={require("./../../assets/animation.gif")}
                                style={{
                                    height: height * 0.25,
                                    width: width * 0.5 ,
                                    borderRadius: 20,
                                    position: "absolute",
                                    top: 0.2 * height,
                                    alignSelf: 'center'
                                }}
                            />
                        </View>

                        <View style={{
                            paddingHorizontal: 0.1 * width,
                            position: "absolute",
                            top: 0.5 * height,
                            width: "100%"
                        }}>

                            {/* <Text style={{
                                fontSize: 50,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                color: Color.colorWhite,
                                textAlign: 'center'
                                
                            }}>Servicita</Text> */}

                            <Button
                                title="Join Now"
                                onPress={() => navigation.navigate("UserRole", {email: '', name: '', userId: ''})}
                                style={{
                                    marginTop: height * 0.35,
                                    width: "80%",
                                    alignSelf: 'center',
                                    borderWidth: 0,
                                    borderColor: 'transparent'
                                }}
                            />   

                            <View style={{
                                flexDirection: "row",
                                marginTop: 0.02 * height,
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    fontSize: 0.02 * height,
                                    color: Color.colorWhite
                                }}>Already have an account ?</Text>
                                <Pressable
                                onPress={() => navigation.navigate("Login")}
                                >
                                    <Text style={{
                                        fontSize: 0.02 * height,
                                        color: Color.colorWhite,
                                        fontWeight: "bold",
                                        marginLeft: 4
                                    }}>Login</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
            </LinearGradient>
    </SafeAreaView>
  )
}
