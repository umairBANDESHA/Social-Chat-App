import moment from 'moment';

// Function to format time
const formatTime = (time) => {
  const now = moment();
  const messageTime = moment(time);

  // Difference in hours between the current time and message time
  const diffInHours = now.diff(messageTime, 'hours');
  const diffInSeconds = now.diff(messageTime, 'seconds');

  if (diffInSeconds < 3,0) {
    // If the time is within the last 60 seconds
    return 'Just now';
  } else if (diffInHours < 24) {
    // If the time is within the same day but more than 60 seconds ago
    return messageTime.format('h:m');
  } else if (diffInHours < 48) {
    // If the time was yesterday
    return 'Yesterday';
  } else {
    // If the time is more than 48 hours ago
    return messageTime.format('DD MMM YYYY');
  }
};

export default formatTime;
