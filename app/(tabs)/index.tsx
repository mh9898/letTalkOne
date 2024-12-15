import { useRouter } from 'expo-router';
import { View, Button } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title="Open Contacts" 
        onPress={() => router.push('/contacts')} 
      />
    </View>
  );
}
