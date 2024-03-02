import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Budget } from "../models/Budget";

const BudgetEntriesListingScreen=()=>{
    const budgets=useSelector((state:any)=>state.budgetReducer)
    return (
        <>
          {budgets.length != 0 ? (
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                  <Text style={styles.headerCell}>Item Name</Text>
                  <Text style={styles.headerCell}>Planned Amount</Text>
                  <Text style={styles.headerCell}>Actual Amount</Text>
                </View>
    
                {budgets.map((item: Budget) => (
                  <View key={item.id} style={styles.row}>
                    <Text style={styles.cell}>{item.itemName}</Text>
                    <Text style={styles.cell}>{item.plannedAmount}</Text>
                    <Text style={styles.cell}>{item.actualAmount}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={{fontSize: 40, color: 'red'}}>
                No Budgets to Show!
              </Text>
            </View>
          )}
    
          {/* <View style={styles.footer}>
            <Button
              title="Add Budget"
              onPress={() => props.navigation.navigate('Budget Entry')}
            />
          </View> */}
        </>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 30,
      margin: 10,
      marginBottom: 10,
    },
    content: {
      flexGrow: 1,
      paddingBottom: 60,
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingBottom: 5,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 15,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingTop: 10,
      paddingBottom: 10,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#fff',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      marginTop: 50,
    },
  });
export default BudgetEntriesListingScreen;