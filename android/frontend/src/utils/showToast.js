// src/utils/showToast.js
import Toast from "react-native-toast-message";

// Show Toast Notification
export const showToast = (type, text1, text2) => {
  Toast.show({
    type: type, // 'success', 'error', 'info'
    text1: text1,
    text2: text2,
    position: "top",
    visibilityTime: 4000,
  });
};
