import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../components/AuthContext';
import { ROUTES } from '../../utils/constants';

export default function RegisterScreen() {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    try {
      await register(name, email, password);
      setSuccess('Cadastro realizado! Faça login.');
      setTimeout(() => router.replace(ROUTES.LOGIN), 1500);
    } catch (e: any) {
      setError('Erro ao cadastrar. Verifique os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
      <Link href={ROUTES.LOGIN} style={styles.link}>
        Já tem conta? Entrar
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    color: '#007bff',
    textAlign: 'center',
  },
}); 