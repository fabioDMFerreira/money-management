import io from 'socket.io-client';

export default () => {
  const socket = process.env.REACT_APP_SOCKET_URL ?
    io(process.env.REACT_APP_SOCKET_URL) :
    null;

  if (socket) {
    return socket;
  }
  else {
    throw new Error('REACT_APP_SOCKET_URL undefined in .env');
  }
}

