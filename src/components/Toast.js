/* eslint-disable */
import Toast from 'react-native-root-toast';
const toast = (msg, type, position, duration, onClose) =>
  Toast.show(msg, {
    duration:
      duration === 'long' ? Toast.durations.LONG : Toast.durations.SHORT,
    position: position ? position : 0,
    backgroundColor: type === 1 ? 'green' : type === 0 ? 'red' : null,
    shadow: false,
    animation: true,
    opacity: type === 1 || type === 0 ? 1 : 0.8,
    onHide: () => {
      onClose && onClose();
    },
  });

export default toast;
