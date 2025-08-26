import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) { // Destructure navigation prop
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello Hi</Text>
        <View style={styles.profileRow}>
        <Image style={styles.profileImage} source={require('../assets/img1.png')}  />
        <Image style={styles.profileImage} source={require('../assets/img1.png')}  />
        <Image style={styles.profileImage} source={require('../assets/img1.png')}  />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabText}>Threads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabText}>Reels</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }}>
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
        <Post
          userName="Alaam"
          userImage='https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          contentImage="https://th.bing.com/th/id/OIP.VKPcqwj5GxDg2TinumNDggHaEK?w=331&h=186&c=7&r=0&o=5&pid=1.7"
          description="Quote from Quran."

        />
        <Post
          userName="Usman Awan"
          userImage= 'https://th.bing.com/th/id/R.413477351a7f0f4c16c6e5e9a87d763b?rik=lm0iE4q95Tp1LA&pid=ImgRaw&r=0' 
          description='Imagination is more powerful than knowledge.'
        />
      </ScrollView>
    </View>
  );
}

// Post Component
const Post = ({ userName, userImage, contentImage, description, likes = 0, comments = 0 }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image style={styles.userImage} source={{ uri: userImage }} />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.postTime}>Following • 3h</Text>
        </View>
      </View>
      {contentImage && <Image style={styles.contentImage} source={{ uri: contentImage }} />}
      {description && <Text style={styles.postDescription}>{description}</Text>}
      <View style={styles.actionRow}>
        <TouchableOpacity>
          <Icon name="favorite" size={24} color="red" />
        </TouchableOpacity>
        <Text>{likes}</Text>
        <TouchableOpacity>
          <Icon name="chat-bubble-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Text>{comments}</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Icon name="share" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'yellow',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileRow: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: 'black',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postTime: {
    color: 'gray',
  },
  contentImage: {
    width: '100%',
    height: 200,
  },
  postDescription: {
    padding: 10,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
