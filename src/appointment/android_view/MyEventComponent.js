import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { workIcons } from '../../icons/Icons';
import { headerTitleColor, globalBackground } from '../../../GlobalStyles';

function extractIconNames(appointment) {
    let workIconsToAdd = [];
    appointment.works.forEach(el => workIconsToAdd.push(el.work.iconName));
    return workIconsToAdd;
}


const MyEventComponent = ({ event, position }) => {
    const [iconNames, setIconNames] = useState(extractIconNames(event));
    

    return (
        <>
            <View style={{ backgroundColor: event.userType === "ADMIN" ? '#FBACCC' : '#1C6DD0', width: '100%', borderRadius: 30, alignItems: 'center' }}>
                <Text style={{ color: 'red', fontFamily: 'MerriWeatherBold', color: 'black' }}> {event.description}</Text>
                <Text>
                    {iconNames.length > 0 ? (
                        <FlatList
                            horizontal
                            data={iconNames}
                            initialNumToRender={10}
                            listKey={(item, index) => index.toString()}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return <View
                                    key={event.id}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '110%'
                                    }}>
                                    <Image
                                        style={[{
                                            width: 25,
                                            height: 25
                                        }]} source={(workIcons.find(icon => icon.name === item)).uri} />
                                </View>
                            }}
                        />
                    ) : ''}
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

});

export default MyEventComponent;