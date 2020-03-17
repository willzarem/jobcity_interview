import Messages from "../../api/messages/model";
import {stooqSearch} from "../rsmq";

const matchingCommand = RegExp(/^\/(\S+)=(\S+)$/);
const commandsDict = {
  'stock': stooqSearch
};

export const onConnection = async (socket) => {
  socket.emit('messages', await getLatestMessages());
  socket.on('addMessage', async (msg) => {
    await Messages.create(msg);
    if (msg.body && matchingCommand.test(msg.body.trim())) {
      const [match, param, value] = matchingCommand.exec(msg.body.trim());
      //TODO: Change to make it scalable for more commands
      if (commandsDict[param]) {
        commandsDict[param].send(value);
      } else {
        console.warn('COMMAND NOT MATCHED', param, match);
      }
    }
    const messages = await getLatestMessages();
    socket.emit('messages', messages);
  });

  socket.on('ready', async () => {
    socket.emit('messages', await getLatestMessages());
  });
};

const getLatestMessages = () => Messages.find().limit(50).sort('createdAt');
