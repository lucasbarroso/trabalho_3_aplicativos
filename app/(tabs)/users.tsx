import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { usersService } from '../../services/users';
import { User } from '../../types/users';
import { PAGINATION } from '../../utils/constants';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async (pageNum: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await usersService.getUsers(pageNum, PAGINATION.DEFAULT_PAGE_SIZE);
      setUsers(data.users);
      setTotal(data.count);
    } catch (e) {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
        />
      )}
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
        <Text style={styles.pageInfo}>{`Página ${page}`}</Text>
        <Button
          title="Próxima"
          onPress={() => setPage(p => p + 1)}
          disabled={page * PAGINATION.DEFAULT_PAGE_SIZE >= total}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageInfo: {
    fontSize: 16,
  },
}); 