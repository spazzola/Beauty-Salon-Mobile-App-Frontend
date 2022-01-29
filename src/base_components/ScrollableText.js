import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { detailParagraph } from '../../GlobalStyles';

const ScrollableText = ({ text }) => {
    return <>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft: '1%' }}>
            <Text style={[ detailParagraph, { fontFamily: 'MerriWeather', alignSelf: 'center' }]}>{text}</Text>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({

});

export default ScrollableText;