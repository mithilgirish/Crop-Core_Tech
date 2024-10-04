import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Types
interface User {
  id: string;
  username: string;
  avatar: string;
}

interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
  imageUri?: string;
  upvotes: string[];
  downvotes: string[];
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: string;
  author: User;
  content: string;
  upvotes: string[];
  timestamp: string;
}

// Color constants
const COLORS = {
  primary: 'green',
  secondary: '#bf6b54',
  accent: 'red',
  background: {
    start: 'black',
    end: '#8a8983',
  },
  card: {
    start: '#ada336',
    end: 'black',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'black',
  },
};

// Mock current user
const currentUser: User = {
  id: '1',
  username: 'CurrentUser',
  avatar: `https://i.pravatar.cc/40?u=currentuser`,
};

const CommunityScreen: React.FC = () => {
  // State
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [isNewPostModalVisible, setNewPostModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to upload images!');
        }
      }
    })();
  }, []);

  // Load posts from AsyncStorage on mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Update filtered posts when search query or posts change
  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return b.upvotes.length - a.upvotes.length;
      }
    });
    
    setFilteredPosts(sorted);
  }, [searchQuery, posts, sortBy]);

  // Storage functions
  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('community_posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const savePosts = async (updatedPosts: Post[]) => {
    try {
      await AsyncStorage.setItem('community_posts', JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  };

  // Image picker function
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setNewPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Post functions
  const createPost = async () => {
    if (!newPostTitle.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    setIsLoading(true);

    try {
      const newPost: Post = {
        id: Date.now().toString(),
        author: currentUser,
        title: newPostTitle,
        content: newPostContent,
        imageUri: newPostImage || undefined,
        upvotes: [],
        downvotes: [],
        comments: [],
        timestamp: new Date().toISOString(),
      };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      await savePosts(updatedPosts);
      
      setNewPostModalVisible(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostImage(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  // Vote handling function
  const handleVote = async (postId: string, voteType: 'up' | 'down') => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotes.includes(currentUser.id);
        const hasDownvoted = post.downvotes.includes(currentUser.id);

        if (voteType === 'up') {
          if (hasUpvoted) {
            return {
              ...post,
              upvotes: post.upvotes.filter(id => id !== currentUser.id),
            };
          } else {
            return {
              ...post,
              upvotes: [...post.upvotes, currentUser.id],
              downvotes: post.downvotes.filter(id => id !== currentUser.id),
            };
          }
        } else {
          if (hasDownvoted) {
            return {
              ...post,
              downvotes: post.downvotes.filter(id => id !== currentUser.id),
            };
          } else {
            return {
              ...post,
              downvotes: [...post.downvotes, currentUser.id],
              upvotes: post.upvotes.filter(id => id !== currentUser.id),
            };
          }
        }
      }
      return post;
    });

    setPosts(updatedPosts);
    await savePosts(updatedPosts);
  };

  // Comment functions
  const addComment = async (postId: string) => {
    if (!newComment.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newCommentObj: Comment = {
          id: Date.now().toString(),
          author: currentUser,
          content: newComment,
          upvotes: [],
          timestamp: new Date().toISOString(),
        };
        return {
          ...post,
          comments: [...post.comments, newCommentObj],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    await savePosts(updatedPosts);
    setNewComment('');
  };

  // Components
  const PostCard: React.FC<{ item: Post; onPress: () => void }> = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[COLORS.card.start, COLORS.card.end]}
        style={styles.postCard}
      >
        <View style={styles.postHeader}>
          <Image
            source={{ uri: item.author.avatar }}
            style={styles.authorAvatar}
          />
          <Text style={styles.postAuthor}>{item.author.username}</Text>
          <Text style={styles.postTimestamp}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={3}>
          {item.content}
        </Text>
        {item.imageUri && (
          <Image
            source={{ uri: item.imageUri }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleVote(item.id, 'up')}
          >
            <Ionicons
              name={item.upvotes.includes(currentUser.id) ? "arrow-up" : "arrow-up-outline"}
              size={24}
              color={COLORS.text.primary}
            />
            <Text style={styles.actionText}>{item.upvotes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleVote(item.id, 'down')}
          >
            <Ionicons
              name={item.downvotes.includes(currentUser.id) ? "arrow-down" : "arrow-down-outline"}
              size={24}
              color={COLORS.text.primary}
            />
            <Text style={styles.actionText}>{item.downvotes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color={COLORS.text.primary} />
            <Text style={styles.actionText}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <Image
          source={{ uri: comment.author.avatar }}
          style={styles.commentAuthorAvatar}
        />
        <Text style={styles.commentAuthor}>{comment.author.username}</Text>
        <Text style={styles.commentTimestamp}>
          {new Date(comment.timestamp).toLocaleString()}
        </Text>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.container}
    >
      {selectedPost ? (
        // Post Detail View
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedPost(null)}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
            <Text style={styles.backButtonText}>Back to Feed</Text>
          </TouchableOpacity>
          <ScrollView style={styles.postDetails}>
            <PostCard item={selectedPost} onPress={() => {}} />
            <View style={styles.commentSection}>
              <Text style={styles.commentSectionTitle}>Comments</Text>
              <View style={styles.newCommentContainer}>
                <TextInput
                  style={styles.commentInput}
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Add a comment..."
                  placeholderTextColor={COLORS.text.secondary}
                />
                <TouchableOpacity
                  style={styles.commentButton}
                  onPress={() => addComment(selectedPost.id)}
                >
                  <Text style={styles.commentButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
              {selectedPost.comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        // Main Feed View
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Community</Text>
            <TouchableOpacity
              style={styles.newPostButton}
              onPress={() => setNewPostModalVisible(true)}
            >
              <Ionicons name="add" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search posts..."
              placeholderTextColor={COLORS.text.secondary}
            />
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setSortBy(sortBy === 'newest' ? 'popular' : 'newest')}
            >
              <Ionicons
                name={sortBy === 'newest' ? 'time-outline' : 'trending-up-outline'}
                size={24}
                color={COLORS.text.primary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredPosts}
            renderItem={({ item }) => (
              <PostCard item={item} onPress={() => setSelectedPost(item)} />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {/* New Post Modal */}
      <Modal
        visible={isNewPostModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <TextInput
              style={styles.modalInput}
              value={newPostTitle}
              onChangeText={setNewPostTitle}
              placeholder="Post title"
              placeholderTextColor={COLORS.text.secondary}
            />
            <TextInput
              style={[styles.modalInput, styles.contentInput]}
              value={newPostContent}
              onChangeText={setNewPostContent}
              placeholder="Write your post..."
              placeholderTextColor={COLORS.text.secondary}
              multiline
            />
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              <Ionicons name="image-outline" size={24} color={COLORS.text.primary} />
              <Text style={styles.imagePickerText}>
                {newPostImage ? 'Change Image' : 'Add Image'}
                </Text>
            </TouchableOpacity>
            {newPostImage && (
              <Image
                source={{ uri: newPostImage }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setNewPostModalVisible(false);
                  setNewPostImage(null);
                  setNewPostTitle('');
                  setNewPostContent('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={createPost}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.text.primary} />
                ) : (
                  <Text style={styles.modalButtonText}>Post</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    color: COLORS.text.primary,
    marginRight: 8,
  },
  sortButton: {
    padding: 8,
  },
  postCard: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  postTimestamp: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    marginLeft: 4,
    color: COLORS.text.primary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.background.end,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  imagePickerText: {
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  commentSection: {
    padding: 16,
  },
  commentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    color: COLORS.text.primary,
    marginRight: 8,
  },
  commentButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  comment: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  commentTimestamp: {
    fontSize: 12,
    color: COLORS.text.secondary,
  },
  commentContent: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  newPostButton: {
    padding: 8,
  },
  postDetails: {
    flex: 1,
  },
});

export default CommunityScreen;