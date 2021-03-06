import { Alert } from 'react-native';

function extractStartTime(date) {
    return date.substring(11, 16);
}

function calculateDurationTime(appointment) {
    let milisDifference = new Date(appointment.finishDate).getTime() - new Date(appointment.startDate).getTime()
    var minutesDifference = Math.floor(milisDifference / (1000 * 60));

    return minutesDifference;
}


function createAppointmentBoxes(appointments) {
    let resultBoxes = [];
    for (const appointment of appointments) {
        let durationTime = calculateDurationTime(appointment);
        let appointmentBoxes = createBoxes(appointment, durationTime);
        resultBoxes.push(appointmentBoxes);
    }
    return resultBoxes;
}

function createBoxes(appointment) {
    let durationTime = calculateDurationTime(appointment);
    let startTime = extractStartTime(appointment.startDate);
    let startHour = parseInt(startTime.substring(0, 2));
    let startMinute = parseInt(startTime.substring(3, 5));

    let boxes = [];

    let firstBoxLength = durationTime - startMinute;
    let firstBox = {};

    if (firstBoxLength > 60 - startMinute) {
        firstBox = createBox(appointment, (60 - startMinute), startHour, startMinute);
        boxes.push(firstBox);
        durationTime -= 60 - startMinute;
    } else {
        firstBox = createBox(appointment, firstBoxLength, startHour, startMinute);
        boxes.push(firstBox);
        durationTime -= firstBoxLength;
    }

    if (durationTime === 0) {
        calculateTopValue(boxes);
        let filteredBoxes = boxes.filter(item => !(item.elementsNumber === 0));

        addClientName(filteredBoxes, appointment);
        addIcons(filteredBoxes, appointment);
        return boxes;
    }

    if (durationTime < 60) {
        let box = createBox(appointment, durationTime, startHour + 1, 0);
        boxes.push(box);
    } else {
        let counter = 1;
        while (durationTime >= 60) {
            let box = createBox(appointment, 60, startHour + counter, 0);
            boxes.push(box)
            counter++;
            durationTime -= 60;
        }
        box = createBox(appointment, durationTime, startHour + counter, 0);
        boxes.push(box);
    }

    calculateTopValue(boxes);
    let filteredBoxes = boxes.filter(item => !(item.elementsNumber === 0));

    addClientName(filteredBoxes, appointment);
    addIcons(filteredBoxes, appointment);

    return filteredBoxes;
}

function createBox(appointment, durationTime, startHour, startTime) {
    return {
        appointmentId: appointment.id,
        location: [startHour, startTime],
        elementsNumber: durationTime / 5,
        spaceToUse: durationTime / 5,
        clientName: '',
        workIcons: []
    }
}

function addClientName(boxes, appointment) {
    const letterWidth = 0.75;
    const desiredLenght = appointment.client.name.length * letterWidth;
    let isNameAdded = false;
    for (const box of boxes) {
        if (box.elementsNumber >= desiredLenght && !isNameAdded) {
            box.clientName = appointment.client.name;
            box.spaceToUse -= desiredLenght;
            isNameAdded = true;
        }
    }
}

function addIcons(boxes, appointment) {
    const iconWidth = 1.5;
    let workIconsToAdd = [];
    appointment.appointmentDetails.forEach(el => workIconsToAdd.push(el));

    for (const box of boxes) {
        for (let i = 0; i < workIconsToAdd.length; i++) {
            if (box.spaceToUse >= iconWidth && workIconsToAdd.length > 0) {
                box.workIcons.push(workIconsToAdd[i].work.iconName);
                workIconsToAdd.shift();
                box.spaceToUse -= iconWidth;
                i = -1;
            }
        }
    }
}

function calculateTopValue(boxes) {
    for (const box of boxes) {
        if (box.location[0] === 6) {
            box.location[0] = 30;
        }
        if (box.location[0] === 7) {
            box.location[0] = 130;
        }
        if (box.location[0] === 8) {
            box.location[0] = 230;
        }
        if (box.location[0] === 9) {
            box.location[0] = 330;
        }
        if (box.location[0] === 10) {
            box.location[0] = 430;
        }
        if (box.location[0] === 11) {
            box.location[0] = 530;
        }
        if (box.location[0] === 12) {
            box.location[0] = 630;
        }
        if (box.location[0] === 13) {
            box.location[0] = 730;
        }
        if (box.location[0] === 14) {
            box.location[0] = 830;
        }
        if (box.location[0] === 15) {
            box.location[0] = 930;
        }
        if (box.location[0] === 16) {
            box.location[0] = 1030;
        }
        if (box.location[0] === 17) {
            box.location[0] = 1130;
        }
        if (box.location[0] === 18) {
            box.location[0] = 1230;
        }
        if (box.location[0] === 19) {
            box.location[0] = 1330;
        }
        if (box.location[0] === 20) {
            box.location[0] = 1430;
        }
        if (box.location[0] === 21) {
            box.location[0] = 1530;
        }
        if (box.location[0] === 22) {
            box.location[0] = 1630;
        }
    }
}

function changeShowMode(appointmentsToShow) {
    if (appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
        return 'double';
    }
    if (appointmentsToShow.myAppointments || appointmentsToShow.employeeAppointments) {
        return 'single';
    }
    if (!appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
        return 'none'
    }
}

function calculateElementTop(item, mode, appointment, isAdmin) {
    if (appointment.employee.role === 'ADMIN' && mode === 'single') {
        return item.location[0];
    }
    if (appointment.employee.role === 'ADMIN' && mode === 'double') {
        return item.location[0] + 50;
    }
    if (appointment.employee.role === 'USER' && mode === 'single' && !isAdmin) {
        return item.location[0] - 30;
    } 
    if (appointment.employee.role === 'USER' && mode === 'single' && isAdmin) {
        return item.location[0];
    }

    if (appointment.employee.role === 'USER' && mode === 'double') {
        return item.location[0] + 10
    }
}

function addBackgroundColor(mode, appointment) {
    return (appointment.employee.role === 'ADMIN' && mode === 'double') ?
        ('#FBACCC')
        :
        (
            (appointment.employee.role === 'USER' && mode === 'double') ?
                ('#1C6DD0')
                :
                appointment.employee.role === 'ADMIN' && mode === 'single' ?
                    ('#FBACCC')
                    :
                    ('#1C6DD0')
        )
}

function isAppointmentFormValid(id, startDate, percentageValueToAdd, clientId, employeeId, workIds) {
    if (id <= 0) {
        Alert.alert("B????d", "Z??e id appointmentu, zadzwo?? do mnie bo co?? si?? wyjeba??o");
        return false;
    }
    if (startDate === '' || startDate === undefined) {
        Alert.alert("B????d", "Podaj dat?? rozpocz??cia");
        return false;
    }
    if (percentageValueToAdd < 0) {
        Alert.alert("B????d", "Podaj dodatni?? warto???? kary");
        return false;
    }
    if (clientId <= 0 || clientId === undefined) {
        Alert.alert("B????d", "Wybierz klienta");
        return false;
    }
    if (employeeId <= 0 || employeeId === undefined) {
        Alert.alert("B????d", "Wybierz pracownika");
        return false;
    }
    if (workIds === null || workIds.length === 0) {
        Alert.alert("B????d", "Wybierz us??ugi");
        return false;
    }
    return true;
}


export { createAppointmentBoxes, calculateDurationTime, createBoxes, changeShowMode, calculateElementTop, addBackgroundColor, isAppointmentFormValid };