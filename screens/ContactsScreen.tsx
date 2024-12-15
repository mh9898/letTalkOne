import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        }); 

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        setError('Permission to access contacts was denied');
      }
    } catch (err) {
      setError('Error fetching contacts');
      console.error(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const renderContact = ({ item }: { item: Contacts.Contact }) => {
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>
          {item.firstName} {item.lastName}
        </Text>
        {item.phoneNumbers && item.phoneNumbers[0] && (
          <Text style={styles.phoneNumber}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Request Permissions Again" onPress={getContacts} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id || Math.random().toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    color: '#666',
    marginTop: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
}); 