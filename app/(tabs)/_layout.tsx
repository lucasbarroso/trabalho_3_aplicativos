import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { ROUTES } from '../../utils/constants';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { jwt, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !jwt) {
      router.replace(ROUTES.LOGIN);
    }
  }, [jwt, loading]);

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarItemStyle: { marginTop: 0 },
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-posts"
        options={{
          title: 'Meus Posts',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: 'Criar Post',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuários',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}
