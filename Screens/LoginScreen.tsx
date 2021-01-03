import { Button, Text, Input, Icon } from "@ui-kitten/components";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { SCREENS } from "../App";
import { ILoginRequest } from "../Interfaces/dtos";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";

function useLoginRequest():[ILoginRequest,(lr:ILoginRequest)=> void] {
    const [lRequest, setLRequest] = React.useState({ email: "", password: "" } as ILoginRequest)
    return [lRequest, setLRequest];
}



const LoginScreen: React.FC<IBaseScreenProps> = (props) => {
    const [loginRequestData, setLReqData] = useLoginRequest();
    const [isSecure, setSecure] = React.useState(true);
    function toggleSecure(){setSecure(!isSecure)}
    const pwdIcon = (props: any) => (
        <TouchableWithoutFeedback onPress={toggleSecure}>
          <Icon {...props} name={isSecure ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
      );
    return (
        <BaseScreen pageTitle={"Monicet App"}>

            <View style={{ paddingTop: 48 }}>


                <Input
                    style={{ width: 310 }}
                    placeholder='Insert Email'
                    value={loginRequestData.email}
                    onChangeText={email => setLReqData({...loginRequestData,email})}
                />
                <Input
                    accessoryRight={pwdIcon}
                    secureTextEntry={isSecure}
                    placeholder='Insert Password'
                    value={loginRequestData.password}
                    onChangeText={password => setLReqData({...loginRequestData,password})}
                />
                <Button onPress={() => props.navigation.navigate(SCREENS.NAV_MAIN_MENU_TABS, { screen: SCREENS.HOME })} style={{ marginTop: 16 }}  >{"Login"}</Button>
            </View>
        </BaseScreen>
    )
}

export default LoginScreen;