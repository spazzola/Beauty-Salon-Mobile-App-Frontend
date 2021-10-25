import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from './context/WorkContext';
import { workIcons, buttonIcons } from '../icons/Icons';
import { globalBackground, detailParagraph, detailTitle } from '../../GlobalStyles';

const WorkDetail = ({ navigation }) => {
    const { state, deleteWork } = useContext(Context);

    const work = state.find((work) => work.id === navigation.getParam('id'));
    const icon = workIcons.find((icon) => icon.name === work.iconName);

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>

                    <View>
                        <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Nazwa:</Text>
                        <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Wartość:</Text>
                        <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Czas trwania:</Text>
                        <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Wybrana ikona:</Text>
                    </View>

                    <View>
                        <Text style={[detailParagraph, { fontFamily: 'KalamRegular'}]}> {work.name}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'KalamRegular'}]}> {work.price}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'KalamRegular'}]}> {work.hoursDuration}h {work.minutesDuration}min</Text>
                        <Text style={detailParagraph}> <Image style={{ marginLeft: 50, maxWidth: 30, maxHeight: 30 }} source={icon.uri} /></Text>
                    </View>
                </View>

                <View style={[styles.buttonsContainer, { flexDirection: 'row' }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('WorkEdit', { id: navigation.getParam('id') })}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'edit')).uri} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Works')
                        deleteClient(work.id)
                    }}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'deleteIcon')).uri} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    },
    button: {
        width: 160,
        height: 80
    }
});

export default WorkDetail;