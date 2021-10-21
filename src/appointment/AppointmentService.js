import AppointmentItem from "./AppointmentItem";

function extractStartTime(date) {
    return date.substring(11, 16);
}

function extractEndTime(date) {
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
        clientName: '',
        workIcons: []
    }
}

function addClientName(boxes, appointment) {
    let isNameAdded = false;
    for (const box of boxes) {
        if (box.elementsNumber > 5 && !isNameAdded) {
            box.clientName = appointment.client.name;
            isNameAdded = true;
        }
    }
}

function addIcons(boxes, appointment) {
    let areIconsAdded = false;
    for (const box of boxes) {
        if (box.elementsNumber >= 6 && !areIconsAdded) {
            let appointmentDetails = appointment.appointmentDetails;
            for (let i = 0; i < appointmentDetails.length; i++) {
                box.workIcons.push(appointmentDetails[i].work.iconName);
            }
            areIconsAdded = true;
        }
    }
}

function calculateTopValue(boxes) {
    for (const box of boxes) {
        if (box.location[0] === 6) {
            box.location[0] = 0;
        }
        if (box.location[0] === 7) {
            box.location[0] = 100;
        }
        if (box.location[0] === 8) {
            box.location[0] = 200;
        }
        if (box.location[0] === 9) {
            box.location[0] = 300;
        }
        if (box.location[0] === 10) {
            box.location[0] = 400;
        }
        if (box.location[0] === 11) {
            box.location[0] = 500;
        }
        if (box.location[0] === 12) {
            box.location[0] = 600;
        }
        if (box.location[0] === 13) {
            box.location[0] = 700;
        }
        if (box.location[0] === 14) {
            box.location[0] = 800;
        }
        if (box.location[0] === 15) {
            box.location[0] = 900;
        }
        if (box.location[0] === 16) {
            box.location[0] = 1000;
        }
        if (box.location[0] === 17) {
            box.location[0] = 1100;
        }
        if (box.location[0] === 18) {
            box.location[0] = 1200;
        }
        if (box.location[0] === 19) {
            box.location[0] = 1300;
        }
        if (box.location[0] === 20) {
            box.location[0] = 1400;
        }
        if (box.location[0] === 21) {
            box.location[0] = 1500;
        }
        if (box.location[0] === 22) {
            box.location[0] = 1600;
        }

    }
}

export { createAppointmentBoxes, calculateDurationTime, createBoxes };


{/* <View style={{ height: '100%', justifyContent: 'center', flexDirection: 'row' }}>
<Text style={styles.label}>
    {item.clientName}
</Text>
<Text style={{ backgroundColor: '' }}>
    {item.workIcons.length > 0 ? (
        <FlatList
            horizontal
            data={item.workIcons}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
                return <View style={{ backgroundColor: '', marginLeft: 20 }}><Image style={styles.icon} source={(icons.find(icon => icon.name === item)).uri} /></View>
            }}
        />
    ) : ''}
</Text>
</View> */}