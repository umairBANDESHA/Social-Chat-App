import * as SQLite from 'expo-sqlite';
import bcrypt from 'bcryptjs';
import * as Crypto from 'expo-crypto';
import moment from 'moment';

// Open the database
const db = SQLite.openDatabaseSync('app.db');

  // Initialize the database with necessary tables
  const initializeDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

   -- Users table for storing user credentials and additional details
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  address TEXT, -- Column for storing the user's address
  profile_picture TEXT -- Column for storing the path or URL to the profile picture
);
    --TO CHECK IF USER IS LOGGED IN OR NOT
CREATE TABLE IF NOT EXISTS auth (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  token TEXT,
  is_logged_in INTEGER
);


-- Posts table for user posts (linked to the users table)
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT,
  image TEXT,
  description TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) -- Link posts to users
);

--freinds request table
CREATE TABLE IF NOT EXISTS friend_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   -- Unique request ID
    sender_id INTEGER NOT NULL,            -- User sending the request
    receiver_id INTEGER NOT NULL,          -- User receiving the request
    status TEXT NOT NULL DEFAULT 'pending',-- Status of the request ('pending', 'accepted', 'declined')
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS FR (
 id INTEGER PRIMARY KEY AUTOINCREMENT,   -- Unique request ID
    sender_id INTEGER NOT NULL,            -- User sending the request
    receiver_id INTEGER NOT NULL,          -- User receiving the request
    status TEXT NOT NULL DEFAULT 'pending',-- Status of the request ('pending', 'accepted', 'declined')
id I)


-- Friends table for managing friends list
 CREATE TABLE IF NOT EXISTS friends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (friend_id) REFERENCES users(id)
        );


-- Chats table for storing chat messages (linked to users table)
CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users (id),
    FOREIGN KEY (receiver_id) REFERENCES users (id)
);

  `);
  };

  const login = async (username, password) => {
   
    try {
      // Fetch the user details from the database
      const result = await db.getAllAsync('SELECT * FROM users WHERE username = ?', [username]);
  
      if (result && result.length > 0) {
        const user = result[0]; // Assuming the result is an array and you want the first user
        
        // Hash the entered password
        const hashedPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );
  
        // Compare hashed passwords
        if (hashedPassword === user.password) {
          
          return user ; // Return the user data
        } else {
          alert('Invalid password');
          return false;
        }
      } else {
        alert('Invalid username');
        return false;
      }
    } catch (error) {
      console.error(error);
      // console.log(result);
      // alert('An error occurred during login');
      // return false;
    }
  };
 
  const signup = async (username, password, email, phoneNumber) => {
    if (!username || !password || !email || !phoneNumber) {
      alert('Please enter all required fields');
      return false;
    }
  
    try {
      // Hash the password before storing it using expo-crypto
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
  
      // Insert new user data into the users table, including email and phone number
      await db.runAsync(
        'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, email, phoneNumber]
      );
  
      alert('Signup successful');
      return true;
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        alert('Username already exists');
      } else {
        alert('An error occurred during signup');
      }
      return false;
    }
  };

  const updateProfile = async (userId, profilePicture, address, phoneNumber, username) => {
    // Initialize the values for the update
    let updatedProfilePicture = profilePicture;
    let updatedAddress = address;
    let updatedPhoneNumber = phoneNumber;
    let updatedUsername = username;
  
    // Get current user data before update to avoid overwriting with null
    const user = await db.runAsync('SELECT profile_picture, address, phone_number, username FROM users WHERE id = ?', [userId]);
  
    // If profilePicture is null, retain the current value
    if (profilePicture == null && user.profile_picture != null) {
      updatedProfilePicture = user.profile_picture;
    }else if ( profilePicture != null && user.profile_picture == null) {
      updatedProfilePicture = profilePicture;
    }
  
    // If address is null, retain the current value
    if (address === null) {
      updatedAddress = user.address;
    }
  
    // If phoneNumber is null, retain the current value
    if (phoneNumber === null) {
      updatedPhoneNumber = user.phone_number;
    }
  
    // If username is null, retain the current value
    if (username === null) {
      updatedUsername = user.username;
    }
  
    // Run the update query with the updated values
    await db.runAsync(
      'UPDATE users SET profile_picture = ?, address = ?, phone_number = ?, username = ? WHERE id = ?',
      [updatedProfilePicture, updatedAddress, updatedPhoneNumber, updatedUsername, userId]
    );
  };  
  //users
  const fetchUsers = async (userId) => {
    try {
      const result = await db.getAllAsync('SELECT * FROM users ;');  // SQL query to fetch all users
      // console.log('Users :', result);
      return result;  // Return the list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  const fetchUser = async (userId) => {
    try {
      const result = await db.getAllAsync(`SELECT * FROM users where id=?`, [userId]);  // SQL query to fetch all users
      // console.log(JSON.stringify(result));
      return result;  // Return the list of users

    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  //posts
  const fetchUserPosts = async (userId) => {
  try {
    const posts = await db.getAllAsync(
      `SELECT * FROM posts WHERE user_id = ? ORDER BY posts.timestamp DESC;`,
      [userId]
    );
    // console.log('time '+posts);
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
  };
  const fetchAllPosts = async () => {
    try {
      const posts = await db.getAllAsync(
        `SELECT 
            posts.id AS post_id,
            posts.content,
            posts.image,
            posts.description,
            posts.timestamp,
            users.id AS user_id,
            users.username,
            users.profile_picture
          FROM posts
          INNER JOIN users ON posts.user_id = users.id 
          ORDER BY 
    posts.timestamp DESC;
          ;`
      );

  
      // Ensure the mapped object includes the fields you need
      return posts.map((post) => ({
        id: post.post_id, // Use the alias for post_id
        userId: post.user_id, // Use the alias for user_id
        content: post.content,
        image: post.image,
        description: post.description,
        timestamp: post.timestamp,
        username: post.username, // Include username from query
        userImage: post.profile_picture, // Include profile_picture from query
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  
  const savePost = (post) => {
    const { userId, content, image, description, timestamp } = post;
  
    return new Promise((resolve, reject) => {
      // Ensure the timestamp is provided or set the default timestamp
      const postTimestamp = timestamp || new Date().toISOString();
  
      db.runAsync(
        `INSERT INTO posts (user_id, content, image, description, timestamp) VALUES (?, ?, ?, ?, ?)`,
        [userId, content, image, description, postTimestamp]
      )
        .then(() => resolve("Post saved successfully."))
        .catch((error) => reject(error));
    });
  };
  
  const deletePostById = async(id) =>{
    try{
      await db.runAsync('DELETE FROM posts WHERE id = ?', [id]);
       return post ;
    }catch (error) {
      console.error('Error deleting user:', error);
    }
  } 
  // Fetch friend request
  const sendRequest = async (userId, freindId) => {
    await db.runAsync(
      `INSERT INTO friend_requests (sender_id, receiver_id, status, created_at)
        VALUES (?, ?, 'pending', ?)
      `, [userId, freindId, new Date().toISOString()]);
    return true;

  };
  const acceptRequest = async (userId, freindId) => {
    await db.runAsync(
      `UPDATE friend_requests
       SET status = 'accepted'
       WHERE sender_id = ? AND receiver_id = ?;
      `,[userId, freindId]);
    return true;

  };
  const declineRequest = async (userId, freindId) => {
    await db.runAsync(
      `UPDATE friend_requests
       SET status = 'declined'
       WHERE id = ? AND receiver_id = ?;
      `,[userId, freindId]);
    return true;

  };
  const fetchSentRequests = async (userId) => {
    try{
      const response = await db.getAllAsync(
        `SELECT * FROM friend_requests WHERE sender_id = ? AND status = 'pending';`, 
        [userId]
      );
      return response;
      
    }catch(error){
    console.log(error);
  }

  };
  const fetchFreindRequests = async (userId) => {
    try{
    const response = await db.getAllAsync(
`
SELECT 
  u.id AS sender_id, 
  u.username AS sender_username, 
  u.profile_picture AS sender_picture,
  fr.sender_id AS id, 
  fr.receiver_id,
  fr.status, 
  fr.created_at
FROM 
  users u 
JOIN 
  friend_requests fr
ON 
  fr.sender_id = u.id
WHERE 
  fr.receiver_id = ? 
  AND fr.status = 'pending';
  `,[userId]
  
);

  // const response2 = await db.getAllAsync('SELECT * FROM friend_requests WHERE status = "pending" AND receiver_id = 2 ;');
  // const response2 = await db.getAllAsync('UPDATE friend_requests SET status = "accepted" WHERE sender_id = 1 ;');
  // console.log(userId+' Console.log: '+JSON.stringify(response2));
    return response;
    }catch(error){
    console.log(error);
  }

  };
  // Fetch Friends
  const ussers = async (userId) => {
    try{
      const response = await db.getAllAsync(`
      SELECT 
        u.id, u.username, u.profile_picture
      FROM 
        users u
      WHERE 
        u.id != ?  -- Exclude the current user
      AND 
        u.id 
      NOT IN (
        SELECT 
          friend_id 
        FROM 
          friends 
        WHERE 
          user_id = ?  -- Exclude friends where you are the user
      UNION
      SELECT 
        user_id 
      FROM 
        friends 
      WHERE 
        friend_id = ?  -- Exclude friends where you are the friend
      );`
        , [userId, userId, userId]);
        // console.log('Console.log: ' + JSON.stringify(response))
      return response;
      }catch(error){
        console.log(error);
      } 
  };
  const addFriend = async (userId, friendId) => {
    await db.runAsync('INSERT INTO friends (user_id, friend_id) VALUES (?, ?)', [userId, friendId]);
  };
  const fetchFriends = async (userId) => {
    const query =  `
    
    `;
    const query2 = `
   SELECT 
    u.id AS user_id,
    u.username AS name, 
    u.profile_picture AS profile_pic
   FROM users u JOIN friends f ON (f.user_id = u.id OR f.friend_id = u.id ) WHERE (f.user_id = ? OR f.friend_id = ?) AND u.id != ?; 
    `;
    const quuu = `SELECT * FROM friends`;
    const user = userId;
    const friends = await db.getAllAsync(query2, [user, user, user]);
    //  await db.runAsync(query2);
     const friends2 = await db.getAllAsync(quuu);
    console.log("fetched Friends "+JSON.stringify(friends2));
    // console.log(friends);
    // const friends = await db.getAllAsync(query2, [userId, userId])
        // console.log('Friends: ' + JSON.stringify(friends));
        return friends;
  };
  const fetchChatFriends = async (userId, friendId) => {
    const query =  `
     SELECT 
    u.id AS user_id,
    u.username AS name,
    u.profile_picture AS profile_pic,
    c.last_msg_time AS msgTime,
    CASE 
        WHEN c.sender_id = ? THEN 'You : ' || c.message
        ELSE u.username || ': ' || c.message
    END AS last_msg
FROM 
    users u
JOIN 
    (
        SELECT 
            CASE 
                WHEN sender_id = ? THEN receiver_id
                ELSE sender_id
            END AS contact_id,
            sender_id,
            message,
            MAX(created_at) AS last_msg_time
        FROM 
            chats
        WHERE 
            sender_id = ? OR receiver_id = ?
        GROUP BY 
            contact_id
    ) AS c
ON 
    u.id = c.contact_id
ORDER BY 
    c.last_msg_time DESC;
  `;
    // const user = await db.getAllAsync(`SELECT message, created_at from chats where sender_id = ? OR receiver_id = ?`, [userId, friendId]);

    const friends = await db.getAllAsync(query, [userId, userId, userId, userId, userId]);
    // const friends = await db.getAllAsync(query?, [userId, userId])
        // console.log('Friends: ' + JSON.stringify(friends));
        return friends;
  };
  
  // Send a chat message
  const sendMessage = async (senderId, receiverId, message) => {
    if (!message) {
      alert('Please enter a message');
      return;
    }
  
    await db.runAsync('INSERT INTO chats (sender_id, receiver_id, message, created_at) VALUES (?, ?, ?, ?)', [senderId, receiverId, message, new Date().toISOString() ]);
  };
  const fetchChatMessages = async (senderId, receiverId) => {
    const messages = await db.getAllAsync( `SELECT * FROM chats
      WHERE (sender_id = ? AND receiver_id = ?)
       OR (sender_id = ? AND receiver_id = ?)
        --WHERE sender_id = 1 ;
        ORDER BY created_at DESC
        `,
    // ,[]);
     [senderId, receiverId, receiverId, senderId]);
  //  console.log('msgs: ' + JSON.stringify(messages))
    return messages;
  };
      

export { 
         initializeDatabase,
         sendMessage,
         fetchUser,
         deletePostById, 
         fetchAllPosts, 
         fetchChatMessages, 
         login, 
         signup, 
         fetchFriends, 
         addFriend, 
         fetchUsers, 
         fetchUserPosts, 
         savePost,
         sendRequest,
         acceptRequest,
         declineRequest,
         fetchFreindRequests,  
         fetchSentRequests,
         fetchChatFriends,
         ussers,
         updateProfile,
        };

       