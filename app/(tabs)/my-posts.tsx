import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { postsService } from '../../services/posts';
import { Post } from '../../types/posts';

const screenWidth = Dimensions.get('window').width;

export default function MyPostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMyPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await postsService.getMyPosts();
      setPosts(data);
    } catch (e) {
      setError('Erro ao carregar seus posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDeletePost = (postId: number, postTitle: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o post "${postTitle}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsService.deletePost(postId);
              Alert.alert('Sucesso', 'Post excluído com sucesso!');
              fetchMyPosts(); // Recarregar lista
            } catch (e) {
              Alert.alert('Erro', 'Erro ao excluir post.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      {item.foto && (
        <Image source={{ uri: item.foto }} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Button
        title="Excluir Post"
        onPress={() => handleDeletePost(item.id!, item.title)}
        color="red"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Posts</Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Você ainda não criou nenhum post.</Text>}
        />
      )}
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
    marginBottom: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
}); 