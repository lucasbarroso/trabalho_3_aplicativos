import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { postsService } from '../../services/posts';
import { ROUTES } from '../../utils/constants';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Preencha título e conteúdo.');
      return;
    }

    if (!image) {
      setError('Selecione uma imagem.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      
      // Adicionar imagem ao FormData
      const imageFile = {
        uri: image,
        type: 'image/jpeg',
        name: 'post-image.jpg',
      } as any;
      formData.append('foto', imageFile);

      await postsService.createPost(formData);
      
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      router.replace(ROUTES.POSTS);
    } catch (e: any) {
      setError('Erro ao criar post. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Post</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título do post"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.textArea}
        placeholder="Conteúdo do post"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />

      <Button title="Selecionar Imagem" onPress={pickImage} />
      
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Criar Post" onPress={handleCreatePost} />
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
  title: {
    fontSize: 24,
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
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
}); 