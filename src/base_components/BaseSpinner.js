import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { headerTitleColor } from '../../GlobalStyles';

const BaseSpinner = ({ }) => {

    return <>
        <View style={styles.loading}>
            <ActivityIndicator animating={true} size="large" color={headerTitleColor} />
        </View>
    </>
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5FCFF88"
    }
});

export default BaseSpinner;