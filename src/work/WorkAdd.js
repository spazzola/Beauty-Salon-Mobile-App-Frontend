import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/WorkContext';
import WorkForm from './WorkForm';

const WorkAdd = ({ navigation }) => {
    const { addWork } = useContext(Context);

    return (
        <WorkForm
            mode={'add'}
            onSubmit={(name, price, hoursDuration, minutesDuration, iconName) => {
                addWork(name, price, hoursDuration, minutesDuration, iconName, () => navigation.navigate('Works'));
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default WorkAdd;