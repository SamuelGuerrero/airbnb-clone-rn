import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSSO } from '@clerk/clerk-expo';

enum Strategy {
    Apple = 'oauth_apple',
    Google = 'oauth_google',
    Facebook = 'oauth_facebook',
}

const Page = () => {
    useWarmUpBrowser();

    const { startSSOFlow } = useSSO();

    const handleAppleAuth = async () => {
        await startSSOFlow({ strategy: Strategy.Apple });
    };

    const handleGoogleAuth = async () => {
        await startSSOFlow({ strategy: Strategy.Google });
    };

    const handleFacebookAuth = async () => {
        await startSSOFlow({ strategy: Strategy.Facebook });
    };

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: handleGoogleAuth,
            [Strategy.Apple]: handleAppleAuth,
            [Strategy.Facebook]: handleFacebookAuth,
        }[strategy];
    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 30 }]} />
            <TouchableOpacity style={defaultStyles.btn} onPress={() => onSelectAuth(Strategy.Apple)}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.seperatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />
                <Text style={styles.seperator}>
                    or
                </Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />
            </View>

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='logo-apple' style={defaultStyles.btnIcon} size={24} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Apple
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name='logo-facebook' style={defaultStyles.btnIcon} size={24} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 26,
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey
    },
    btnOutline: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
})

export default Page