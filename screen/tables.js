import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { deleteTable } from '../Screens/Auth/database';

const db = SQLite.openDatabaseSync('app.db'); // Open the SQLite database

const ShowTablesScreen = () => {
  const [tables, setTables] = useState([]);

  // Function to fetch tables and columns
  const showTablesAndColumns = async () => {
    try {
      // Query to get all the tables in the database
      const tablesResult = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table';");
      let tableDetails = [];

      // Loop through all the tables and get columns for each table
      for (const table of tablesResult) {
        const tableName = table.name;
        
        // Query to get the columns of the current table
        const columnsResult = await db.getAllAsync(`PRAGMA table_info(${tableName});`);
        
        // Extract column names
        const columns = columnsResult.map(col => col.name);

        // Add the table and its columns to the list
        tableDetails.push({ name: tableName, columns });
      }

      // Update the state with the fetched table details
      setTables(tableDetails);
    } catch (error) {
      console.error('Error fetching tables and columns:', error);
    }
  };

  useEffect(() => {
    // Fetch tables and columns when the component is mounted
    showTablesAndColumns();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Database Tables and Columns</Text>

      {/* Render the table and columns in a FlatList */}
      <FlatList
        data={tables}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.tableContainer}>
            <Text style={styles.tableName}>Table: {item.name}</Text>
            <Text style={styles.columns}>Columns: {item.columns.join(', ')}</Text>
          </View>
        )}
      />
        {/* <Button title='Delte Tables' onPress={()=> deleteTable()}/> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tableName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  columns: {
    fontSize: 16,
    color: '#555',
  },
});

export default ShowTablesScreen;
