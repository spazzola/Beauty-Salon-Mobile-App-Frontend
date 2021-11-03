const globalBackground = {
    backgroundColor: '#F4F9F9'
};

const itemContainer = {
    height: 60,
    width: '100%',
    //width: '90%',
    //borderWidth: 1,
    //marginTop: 15,
    //borderRadius: 30,
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    backgroundColor: '#DDBEBE',

};

const itemParagraph = {
    fontSize: 30,
    width: '100%',
    flexDirection: 'row',
    fontFamily: 'NotoSerif',
    color: '#F4F9F9'
};

const input = {
    fontSize: 18,
    textAlign: 'center',
    margin: 'auto',
    height: 60,
    width: '80%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    backgroundColor: '#F1D1D0',
};

const detailParagraph = {
    marginTop: 10,
    fontSize: 25,
    textAlign: 'left'
}

const detailTitle = {
    marginTop: 10,
    fontSize: 25,
    textAlign: 'right'
}

const buttonWrapper = {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 30,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3
}

const button = {
    backgroundColor: '#F875AA',
    width: 160,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
}

const buttonText = {
    fontSize: 20,
    textAlign: 'center',
    color: '#F4F9F9'
}

export { globalBackground, itemContainer, itemParagraph, input, detailTitle, detailParagraph, button, buttonText, buttonWrapper };