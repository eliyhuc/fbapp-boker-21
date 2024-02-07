import react, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'

import MCI from 'react-native-vector-icons/MaterialCommunityIcons'

const ShoppingItem = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [units, setUnits] = useState(parseInt(props.product.units));
    const [generalSum, setGeneralSum] = useState(parseInt(parseFloat(props.product.generalSum)));

    const updateUnit = (str) => {
        if (str === '-') {
            if(parseInt(units) === 1){
                Alert.alert("Value must be 1 or greater")
            } else {
                setUnits(parseInt(units) - 1)
                setGeneralSum(parseInt(units) * parseFloat(props.product.productPrice));
            }
        } else {
            setUnits(parseInt(units) + 1)
            setGeneralSum(parseInt(units) * parseFloat(props.product.productPrice));
        }
    }

    return (
        <View style={styles.row}>


            {
                isEdit ? (<>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MCI
                            onPress={() => { updateUnit("-") }}
                            size={24}
                            color='#00cc99'
                            name="minus-circle-outline" />

                        <TextInput
                            value={units.toString()}
                            onChangeText={(e) => {setUnits(e)}}
                            style={styles.input} />

                        <MCI
                            onPress={() => { updateUnit("+") }}
                            size={24}
                            color='#00cc99'
                            name="plus-circle-outline" />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.prod_name, { fontWeight: '500', fontSize: 20, marginRight: 10 }]}>
                            {generalSum}₪
                        </Text>

                        <MCI
                            onPress={() => { props.updateProduct(props.product.id) }}
                            size={24}
                            color='#00cc99'
                            name="content-save" />

                        <MCI
                            onPress={() => { setIsEdit(!isEdit) }}
                            size={24}
                            color='#0099cc'
                            name="arrow-right" />
                    </View>
                </>) : (<>
                    <Text style={styles.prod_name}>{props.product.productName} ({props.product.units})</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.prod_name, { fontWeight: '500', fontSize: 20, marginRight: 10 }]}>
                            {generalSum.toFixed(2)}₪
                        </Text>

                        <MCI
                            style={{ marginRight: 10 }}
                            onPress={() => { props.deleteProduct(props.product.id) }}
                            size={24}
                            color='#880000'
                            name="delete-outline" />

                        <MCI
                            onPress={() => { setIsEdit(!isEdit) }}
                            size={24}
                            color='#00cc99'
                            name="square-edit-outline" />
                    </View>
                </>)
            }

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "50%",
        backgroundColor: "#ebebeb",
        padding: 8,
        borderRadius: 10,
        justifyContent:'center',
        fontSize:22
    },
    prod_name: {
        fontSize: 18
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 12
    },
})

export default ShoppingItem;