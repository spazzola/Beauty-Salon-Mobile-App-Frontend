import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from './context/WorkContext';
import icons from '../icons/Icons';

const WorkDetail = ({ navigation }) => {
    const { state, deleteWork } = useContext(Context);

    const work = state.find((work) => work.id === navigation.getParam('id'));
    const icon = icons.find((icon) => icon.name === work.iconName);

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Nazwa: </Text> {work.name}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Wartość: </Text> {work.price}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Czas Trwania: </Text> {work.hoursDuration}h {work.minutesDuration}min</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Wybrana ikona:</Text><Image style={{marginLeft: 50, maxWidth: 30, maxHeight: 30}} source={icon.uri}/></Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edytuj" onPress={() => navigation.navigate('WorkEdit', { id: navigation.getParam('id') })} />
                <Button title="Usuń" onPress={() => {
                    navigation.navigate('Works')
                    deleteWork(work.id)
                    }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    }
});

export default WorkDetail;