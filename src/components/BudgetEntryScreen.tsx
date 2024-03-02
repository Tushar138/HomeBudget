import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { Budget } from "../models/Budget";
import { saveBudgetEntry } from "../redux/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BudgetEntryScreen=(props:any)=>{
   const [itemName, setItemName]=useState('');
   const [plannedAmount, setPlannedAmount]=useState('');
   const [actualAmount, setActualAmount]=useState('');
   const [error, setError]=useState(false);
   const [errorMsg, setErrorMsg]=useState('');
   
   const dispatch=useDispatch();
   const budgets=useSelector((state:any)=>state.budgetReducer)

   const clearFields=()=>{
        setItemName('');
        setPlannedAmount('');
        setActualAmount('');
        setError(false);
        setErrorMsg('');
   }
   const saveEntry=async (budget:Budget)=>{
        AsyncStorage.setItem('budgetEntries',JSON.stringify([... budgets, budget])).then(()=>{
            dispatch(saveBudgetEntry(budget));
            clearFields();
        }).catch((error: any)=>{
            console.error("Error saving entry in storage", error);
        });
   }
   const handleSaveEntry=()=>{
    if (!itemName.trim() || !plannedAmount.trim() || !actualAmount.trim()) {
        setError(true);
        setErrorMsg("All Fields Are Mandatory");
        return;
    }
    if(isNaN(Number(actualAmount))||isNaN(Number(plannedAmount))){
        setError(true)
        setErrorMsg('Amount Must Be Numeric')
        return;
    }
    const isBudgetExist=budgets.some((budget:Budget)=>budget.itemName.toLowerCase()==itemName.toLowerCase())
    if(isBudgetExist){
      setError(true);
      setErrorMsg('This budget is already exist');
    }
    else{
        const budget:Budget={
            id: Math.random()+10101+Math.random(),
            itemName: itemName.trim(),
            plannedAmount: plannedAmount.trim(),
            actualAmount: actualAmount.trim()
        }
        saveEntry(budget);
    }
   }
    return(
        <>
        <ScrollView style={{marginTop:100}}> 
    <View >
        {error?<Text style={styles.text}>*{errorMsg}</Text>:<></>}
        <TextInput 
        style={styles.textInput}
        placeholder="Enter Item Name"
        value={itemName}
        onChangeText={(text)=>setItemName(text)}
        />
        <TextInput 
        placeholder="Enter Planned Amount"
        style={styles.textInput}
        keyboardType="numeric"
        value={plannedAmount}
        onChangeText={(amount)=>setPlannedAmount(amount)}
        /> 
        <TextInput 
        placeholder="Enter Actual Amount"
        style={styles.textInput}
        keyboardType="numeric"
        value={actualAmount}
        onChangeText={(amount)=>setActualAmount(amount)}
        /> 
    </View>
    <View style={styles.footer}>
        <View style={{marginBottom:10}}>
        <Button
            title="Save Entry"
            color={'green'}
            onPress={handleSaveEntry}

        />
        </View>
        <Button
            title="Show Entries"
            color={'blue'}
            onPress={()=>{
                clearFields();
                props.navigation.navigate('BudgetEntriesListingScreen')
            }}
        />
    </View>
    </ScrollView>
    </>
    )

}

const styles=StyleSheet.create({
    text:{
        marginLeft: 30,
        fontSize:20,
        color: 'red',
        marginBottom: 20
    },
    textInput: {
        borderWidth: 2,
        borderColor: 'green',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 50,
        borderRadius: 10,
      },
      footer: {
        position: 'relative',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 50,
      },
})
export default BudgetEntryScreen;