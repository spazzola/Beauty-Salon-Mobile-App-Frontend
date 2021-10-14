import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, FlatList } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import icons from '../icons/Icons';

const WorkForm = ({ onSubmit, initialValues, mode }) => {
    const [name, setName] = useState(initialValues.name);
    const [price, setPrice] = useState(initialValues.price);
    const [hoursDuration, setHoursDuration] = useState(initialValues.hoursDuration);
    const [minutesDuration, setMinutesDuration] = useState(initialValues.minutesDuration);
    const [iconName, setIconName] = useState(initialValues.iconName);

    const [myArray, setMyArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [images, setimages] = useState(icons);
    
    return (
        <View style={{ height: 500 }}>
            <Text style={styles.label}>Nazwa:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Text style={styles.label}>Wartość:</Text>
            <NumericInput
                style={styles.input}
                value={price}
                onChange={text => setPrice(text)}
            />
            <Text style={styles.label}>Czas trwania godziny:</Text>
            <NumericInput
                style={styles.input}
                value={hoursDuration}
                onChange={text => setHoursDuration(text)}
            />
            <Text style={styles.label}>Czas trwania minuty:</Text>
            <NumericInput
                style={styles.input}
                value={minutesDuration}
                onChange={text => setMinutesDuration(text)}
            />
            <View style={{marginTop: 10}}>
            <View>
                <Text style={styles.label}>Wybrana ikona:</Text>
                {iconName === '' ? null : <Image style={styles.icon} source={(icons.find(icon => icon.name === iconName)).uri}/>}
                
                <FlatList
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    data={images}
                    keyExtractor={item => item.name}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => setIconName(item.name)}>
                            <Image source={item.uri} 
                                style={{
                                    width: 50,
                                    height: 50,
                                    marginLeft: 50,
                                    marginTop: 20,
                                    resizeMode: 'contain',
                                    margin: 8
                                }}
                            />
                        </TouchableOpacity>
                    )}
                /></View>
            </View>
            <Button title={mode === 'add' ? "Dodaj usługę" : "Edytuj usługę"} onPress={() => onSubmit(name, price, hoursDuration, minutesDuration, iconName)} />
        </View>
    );
};

WorkForm.defaultProps = {
    initialValues: {
        name: '',
        price: 0,
        hoursDuration: 0,
        minutesDuration: 0,
        iconName: ''
    }
};

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    container: {
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 400
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WorkForm;
