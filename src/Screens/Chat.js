import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Actions, Bubble, GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'react-native-blob-util';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const userId1 = route.params.id; // current user ID
  const userData = route.params.data; // user you are chatting with
  const userId2 = userData.userId;
  const chatId = [userId1, userId2].sort().join('_');

  // 🔥 Set custom header with name and photo
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <TouchableOpacity style={styles.headerContainer}>
            <Image
              source={
                userData.profilePicture
                  ? {uri: userData.profilePicture}
                  : require('../images/user.png') // Fallback profile image
              }
              style={styles.profileImage}
            />
            <Text style={styles.headerName}>{userData.name}</Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../images/videocall.png')}
              style={styles.iconRight}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../images/voicecall.png')}
              style={styles.iconRight}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../images/more.png')}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, userData]);

  // 🔄 Load messages in real time
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allmessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text || '',
            image: data.image || null,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            user: data.user,
            sendBy: data.sendBy,
            sendTo: data.sendTo,
            status: data.status || 'sent',
          };
        });
        setMessages(allmessages);

        if (isFocused) {
          snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.sendTo === userId1 && data.status === 'sent') {
              doc.ref.update({status: 'seen'});
            }
          });
        }
      });

    return () => unsubscribe();
  }, [chatId, userId1, isFocused]);

  // ✅ Mark messages as seen on load
  useEffect(() => {
    const markSeen = async () => {
      const snap = await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .where('sendTo', '==', userId1)
        .where('status', '==', 'sent')
        .get();

      snap.forEach(doc => {
        doc.ref.update({status: 'seen'});
      });
    };

    markSeen();
  }, [chatId, userId1]);

  // ✅ Send Text Message
  const onSend = useCallback(
    (messages = []) => {
      const msg = messages[0];

      if (!msg || !msg.text || !msg.createdAt || !userId1 || !userId2) return;

      const newMessage = {
        _id: msg._id,
        text: msg.text || '',
        image: msg.image || null,
        user: {_id: userId1},
        sendBy: userId1,
        sendTo: userId2,
        createdAt: new Date(),
        status: 'sent',
      };

      setMessages(prev => GiftedChat.append(prev, newMessage));

      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(newMessage);
    },
    [chatId, userId1, userId2],
  );

  // ✅ Upload to Firebase Storage and get URL
  const uploadImageToFirebase = async (uploadUri, filename) => {
    try {
      const cleanUri = uploadUri.startsWith('file://')
        ? uploadUri
        : `file://${uploadUri}`;
      const ref = storage().ref(`chatImages/${filename}`);
      const task = ref.putFile(cleanUri);
      await task;
      return await ref.getDownloadURL();
    } catch (error) {
      console.error('🔥 Upload failed:', error.message ?? error);
      throw error;
    }
  };

  // ✅ Pick image and send as message
  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (!result.didCancel && result.assets?.length > 0) {
        const image = result.assets[0];
        const uri = image.uri;

        const fileExists = await RNFetchBlob.fs.exists(uri);
        if (!fileExists) {
          console.error('❌ File not found at:', uri);
          return;
        }

        const filename = image.fileName ?? `chat-img-${Date.now()}.jpg`;
        const downloadURL = await uploadImageToFirebase(uri, filename);

        const imageMessage = {
          _id: Date.now().toString(),
          createdAt: new Date(),
          user: {_id: userId1},
          image: downloadURL,
          sendBy: userId1,
          sendTo: userId2,
          status: 'sent',
          text: '',
        };

        firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .add(imageMessage);
      }
    } catch (error) {
      console.error('Image upload error:', error.message ?? error);
    }
  };

  // 📷 Custom action icon using local uploader image
  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={{marginLeft: 20}}
      icon={() => (
        <Image
          source={require('../images/uploader.png')}
          style={{width: 24, height: 24, borderRadius: 5}}
        />
      )}
      onPressActionButton={handlePickImage}
    />
  );

  // 💬 Render chat bubbles + ticks
  const renderBubble = props => {
    const currentMessage = props.currentMessage;
    const isMyMessage = currentMessage.sendBy === userId1;

    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {backgroundColor: '#0084FF'},
            left: {backgroundColor: '#E4E6EB'},
          }}
          renderMessageImage={({currentMessage}) =>
            currentMessage.image ? (
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={{uri: currentMessage.image}}
                  style={styles.chatImage}
                />
              </TouchableOpacity>
            ) : null
          }
        />
        {isMyMessage && (
          <Text
            style={[
              styles.tickText,
              currentMessage.status === 'seen' && styles.tickSeen,
            ]}>
            {currentMessage.status === 'seen' ? '✓✓' : '✓'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../images/chatBackgroundImage.png')} // Replace with your image path
        style={styles.backgroundImage}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{_id: userId1}}
          renderActions={renderActions}
          renderBubble={renderBubble}
          alwaysShowSend
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  tickText: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 5,
  },
  tickSeen: {
    color: 'blue',
  },
  chatImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconRight: {
    width: 22,
    height: 22,
    marginHorizontal: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // covers the whole screen
  },
});

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import firestore from '@react-native-firebase/firestore';

// const Chat = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const typingTimeoutRef = useRef(null);

//   const userId1 = route.params.id; // current user
//   const userId2 = route.params.data.userId; // the user you're chatting with
//   const chatId = [userId1, userId2].sort().join('_');

//   // 🔹 Fetch real messages
//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('chats')
//       .doc(chatId)
//       .collection('messages')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(snapshot => {
//         const allMessages = snapshot.docs.map(doc => ({
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate?.() || new Date(),
//           _id: doc.id,
//         }));

//         setMessages(allMessages);
//       });

//     return () => unsubscribe();
//   }, [chatId]);

//   // 🔹 Mark all incoming messages as seen when you open the chat
//   useEffect(() => {
//     const markSeen = async () => {
//       const snapshot = await firestore()
//         .collection('chats')
//         .doc(chatId)
//         .collection('messages')
//         .where('sendTo', '==', userId1)
//         .where('status', '==', 'sent')
//         .get();

//       snapshot.forEach(doc => {
//         doc.ref.update({ status: 'seen' });
//       });
//     };

//     markSeen();
//   }, [chatId, userId1]);

//   // 🔹 Listen for typing status of the other user
//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('chats')
//       .doc(chatId)
//       .onSnapshot(doc => {
//         const data = doc.data();
//         setIsTyping(data?.typingStatus?.[userId2] || false);
//       });

//     return () => unsubscribe();
//   }, [chatId, userId2]);

//   // 🔹 Send a message
//   const onSend = useCallback((messages = []) => {
//     const msg = messages[0];

//     const newMsg = {
//       _id: msg._id,
//       text: msg.text,
//       user: msg.user,
//       sendBy: userId1,
//       sendTo: userId2,
//       createdAt: new Date(),
//       status: 'sent',
//     };

//     setMessages(previousMessages => GiftedChat.append(previousMessages, newMsg));

//     firestore()
//       .collection('chats')
//       .doc(chatId)
//       .collection('messages')
//       .add(newMsg);

//     // Stop typing when message is sent
//     firestore().collection('chats').doc(chatId).set({
//       typingStatus: { [userId1]: false }
//     }, { merge: true });
//   }, []);

//   // 🔹 Update typing status as the user types
//   const handleInputTextChanged = (text) => {
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     firestore().collection('chats').doc(chatId).set({
//       typingStatus: { [userId1]: !!text }
//     }, { merge: true });

//     // Stop typing after 2 seconds of inactivity
//     typingTimeoutRef.current = setTimeout(() => {
//       firestore().collection('chats').doc(chatId).set({
//         typingStatus: { [userId1]: false }
//       }, { merge: true });
//     }, 2000);
//   };

//   // 🔹 Custom ticks
//   const renderBubble = (props) => {
//     const currentMessage = props.currentMessage;
//     return (
//       <View>
//         <Bubble {...props} />
//         {currentMessage.user._id === userId1 && currentMessage.text !== 'Typing...' && (
//           <Text
//             style={[
//               styles.tickText,
//               currentMessage.status === 'seen' && styles.tickSeen
//             ]}
//           >
//             {currentMessage.status === 'seen' ? '✓✓' : '✓'}
//           </Text>
//         )}
//       </View>
//     );
//   };

//   // 🔹 Add "Typing..." as a fake message if needed
//   const displayMessages = isTyping
//     ? [
//         {
//           _id: userId2,
//           text: 'Typing...',
//           createdAt: new Date(),
//           user: { _id: userId2, name: userId2 },
//         },
//         ...messages,
//       ]
//     : messages;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <GiftedChat
//         messages={displayMessages}
//         onSend={onSend}
//         user={{ _id: userId1 }}
//         onInputTextChanged={handleInputTextChanged}
//         renderBubble={renderBubble}
//         showUserAvatar={false}
//         showAvatarForEveryMessage={false}
//       />
//     </SafeAreaView>
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   tickText: {
//     fontSize: 12,
//     color: 'gray',
//     alignSelf: 'flex-end',
//     marginRight: 10,
//     marginBottom: 5,
//   },
//   tickSeen: {
//     color: 'blue',
//   },
// });
