import { Button, Text, Input, Icon } from "@ui-kitten/components";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { ILoginRequest } from "../Interfaces/dtos";
import BaseScreen, { IBaseScreenProps } from "./BaseScreen";

function useLoginRequest():[ILoginRequest,(lr:ILoginRequest)=> void] {
    const [lRequest, setLRequest] = React.useState({ email: "", password: "" } as ILoginRequest)
    return [lRequest, setLRequest];
}



const WelcomeScreen: React.FC<IBaseScreenProps> = (props) => {
    const [loginRequestData, setLReqData] = useLoginRequest();
    const [isSecure, setSecure] = React.useState(true);
    function toggleSecure(){setSecure(!isSecure)}
    const pwdIcon = (props: any) => (
        <TouchableWithoutFeedback onPress={toggleSecure}>
          <Icon {...props} name={isSecure ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
      );
    return (
        <BaseScreen navigation={props.navigation} pageTitle={"Home"}>
            <Text category={"h4"} >{"Welcome to the Main Screen"}</Text>
            <View>
                <Button  >{"Login"}</Button>

                <Input
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
            </View>
        </BaseScreen>
    )
}