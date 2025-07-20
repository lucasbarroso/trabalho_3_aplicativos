import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { postsService } from '../../services/posts';
import { Post } from '../../types/posts';
import { PAGINATION } from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await postsService.getPosts(pageNum, PAGINATION.DEFAULT_PAGE_SIZE);
      setPosts(data.posts);
      setTotal(data.count);
    } catch (e) {
      setError('Erro ao carregar posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      {item.foto && (
        <Image source={{ uri: item.foto }} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts</Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum post encontrado.</Text>}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  postItem: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  image: {
    width: screenWidth - 32,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 15,
    color: '#333',
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