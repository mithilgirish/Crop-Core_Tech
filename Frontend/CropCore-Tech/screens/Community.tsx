import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Define types
interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  comments: number;
  timestamp: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  upvotes: number;
}

// Color constants
const COLORS = {
  primary: '#1E88E5',
  secondary: '#3949AB',
  accent: '#00ACC1',
  background: {
    start: '#1A237E',
    end: '#121212',
  },
  card: {
    start: '#1E88E5',
    end: '#0D47A1',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0BEC5',
  },
};

// Generate mock data
const generateMockData = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    author: `User${i + 1}`,
    title: `Post Title ${i + 1}`,
    content: `This is the content of post ${i + 1}. It's a static example of what a longer post might look like on the Reddit-like community page.`,
    upvotes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 50),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }));
};

const posts: Post[] = generateMockData(60);

const generateMockComments = (count: number): Comment[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    author: `Commenter${i + 1}`,
    content: `This is a sample comment ${i + 1}. It could be short or long, depending on what the user wrote.`,
    upvotes: Math.floor(Math.random() * 100),
  }));
};

// Components
const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => (
  <View style={styles.comment}>
    <Text style={styles.commentAuthor}>{comment.author}</Text>
    <Text style={styles.commentContent}>{comment.content}</Text>
    <View style={styles.commentActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="arrow-up-outline" size={16} color={COLORS.text.secondary} />
        <Text style={styles.actionText}>{comment.upvotes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="arrow-down-outline" size={16} color={COLORS.text.secondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chatbubble-outline" size={16} color={COLORS.text.secondary} />
        <Text style={styles.actionText}>Reply</Text>
      </TouchableOpacity>
    </View>
  </View>
);

interface PostCardProps {
  item: Post;
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={[COLORS.card.start, COLORS.card.end]}
      style={styles.postCard}
    >
      <View style={styles.postHeader}>
        <Image
          source={{ uri: `https://i.pravatar.cc/40?u=${item.author}` }}
          style={styles.authorAvatar}
        />
        <Text style={styles.postAuthor}>{item.author}</Text>
        <Text style={styles.postTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={3}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-up-outline" size={24} color={COLORS.text.primary} />
          <Text style={styles.actionText}>{item.upvotes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color={COLORS.text.primary} />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const CommunityScreen: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const renderPostDetails = () => {
    if (!selectedPost) return null;

    const comments = generateMockComments(Math.floor(Math.random() * 20) + 5);

    return (
      <ScrollView style={styles.postDetails}>
        <PostCard item={selectedPost} onPress={() => {}} />
        <View style={styles.commentSection}>
          <Text style={styles.commentSectionTitle}>Comments</Text>
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <PostCard item={item} onPress={() => setSelectedPost(item)} />
  );

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.container}
    >
      {selectedPost ? (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedPost(null)}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
            <Text style={styles.backButtonText}>Back to Feed</Text>
          </TouchableOpacity>
          {renderPostDetails()}
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Community</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginRight: 8,
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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    color: COLORS.text.primary,
  },
  postDetails: {
    flex: 1,
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
  comment: {
    marginBottom: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default CommunityScreen;