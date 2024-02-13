import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList,
  Button,
  View,
} from "react-native";

import { database, auth } from "./firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import ShoppingItem from "./ShoppingItem";

const Shop = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [units, setUnits] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  //CREATE
  const addProduct = async () => {
    setIsLoading(true);
    if (productName !== "" && productPrice > 0 && units > 0) {

      const sum = parseFloat(productPrice) * parseFloat(units);

      try {

        const docRef = await addDoc(collection(database, "shopping"),{
          productName: productName,
          productPrice: productPrice,
          units: units,
          generalSum: sum,
          userUid: auth.currentUser.uid
        });
        loadProducts();
        setIsLoading(false);
        setProductName("")
        setProductPrice(0)
        setUnits(1)
      } catch (error) {
        setIsLoading(false);
        Alert.alert(error.message);
      }
    } else {
      setIsLoading(false);
      Alert.alert("Check your inputs");
    }
  };

  //READ
  const loadProducts = async() => {
    setIsLoading(true)
    try {  
      const shoppingRef = collection(database, "shopping");
      const shoplist = await getDocs(shoppingRef);
      setShoppingList(shoplist.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })))

      setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        Alert.alert(error.message);
    }
  }

  useEffect(() => {
    loadProducts();
  },[])

  //DELETE
  const deleteProduct = async(id) => {
    try {
      
      const productRef = doc(database, "shopping", id)
      await deleteDoc(productRef)

      loadProducts();

    } catch (error) {
      Alert.alert(error.message)
    }
  }

  const updateProduct = async(id, units, generalSum) => {
    const productRef = doc(database, "shopping", id);
    await updateDoc(productRef, {
      generalSum:generalSum,
      units: units
    })
    loadProducts()
  }


  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <TextInput
          value={productName}
          onChangeText={(e) => {
            setProductName(e);
          }}
          placeholder="Product name"
          keyboardType="default"
          style={styles.input}
        />

        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TextInput
            value={productPrice.toString()}
            onChangeText={(e) => {
              setProductPrice(e);
            }}
            placeholder="Product price"
            keyboardType="numeric"
            style={styles.input50}
          />
          <TextInput
            value={units.toString()}
            onChangeText={(e) => {
              setUnits(e);
            }}
            placeholder="Number of items"
            keyboardType="numeric"
            style={styles.input50}
          />
        </View>

        {
          isLoading 
          ? (<ActivityIndicator color='#ffcc00' size='large' />) 
          : (
          <TouchableOpacity onPress={addProduct} style={{width: "100%",borderRadius: 12,alignItems: "center",paddingVertical: 10,backgroundColor: "#000000",}}>
            <Text style={{ color: "#ffcc00", fontWeight: "300", fontSize: 18 }}>Add Product</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list_container}>


            <Button title="Signout" onPress={() => auth.signOut()} />

          <FlatList
            style={{width:'100%'}}
            data={shoppingList}
            keyExtractor={item => item.id}
            renderItem={itemRow => 
              <ShoppingItem
                updateProduct={updateProduct}
                product={itemRow.item}
                deleteProduct={deleteProduct}
              />
            }
          />
      </View>
      <View style={styles.sum_container}>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sum_container:{
       width: "100%",
      height: "10%",
      padding: 10,
      backgroundColor:'#000'
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  input50: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  form_container: {
    width: "100%",
    height: "22%",
    padding: 20,
  },
  list_container: {
    width: "100%",
    height: "68%",
    padding:20
  },
  container: {
    flex: 1,
    backgroundColor: "#00cc99",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Shop;
