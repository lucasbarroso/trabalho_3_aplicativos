import { Link } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../components/AuthContext';
import { ROUTES } from '../../utils/constants';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Olá, {user.name}!</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}

      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>O que você gostaria de fazer?</Text>
        
        <Link href={ROUTES.POSTS} asChild>
          <Button title="Ver Todos os Posts" />
        </Link>
        
        <Link href={ROUTES.MY_POSTS} asChild>
          <Button title="Ver Meus Posts" />
        </Link>
        
        <Link href={ROUTES.CREATE_POST} asChild>
          <Button title="Criar Novo Post" />
        </Link>
        
        <Link href={ROUTES.USERS} asChild>
          <Button title="Ver Usuários" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    gap: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});
