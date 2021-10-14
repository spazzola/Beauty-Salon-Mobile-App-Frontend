import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/WorkContext';
import WorkForm from './WorkForm';

const WorkEdit = ({ navigation }) => {
    const id = navigation.getParam('id');

    const { state, editWork } = useContext(Context);

    const work = state.find(work => work.id === id);

    return (
        <WorkForm
            mode={'edit'}
            initialValues={{ name: work.name, price: work.price, hoursDuration: work.hoursDuration, minutesDuration: work.minutesDuration, iconName: work.iconName }}
            onSubmit={(name, price, hoursDuration, minutesDuration, iconName) => {
                editWork(id, name, price, hoursDuration, minutesDuration, iconName, () => navigation.pop());
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default WorkEdit;