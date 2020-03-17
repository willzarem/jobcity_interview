# Jobcity aplication 

## 1. Structure
### chat_server
This is a nodejs + express server that has a couple of RESTful services that provides access to the mongodb as well as the redis queue. This also connects a client through socket.io to make the realtime chat work
### chat-app
This is an angular app that contains the UI for the selection of the rooms and the chat for each one. It speaks to the server through socket.io as well
### chat_bot
This is a nodejs + express server that connects only to redis' queue and processes every message sent to the queue and pushes the result to another queue
## 2. Requirements
    * mongodb installed
    * redis installed and daemon running
    * nodejs

## 3. Instructions
### chat_server
    cd chat_server
    npm run start
### chat-app
    cd chat-app
    npm run start
### chat_bot
    cd chat_bot
    npm run start
### browser
* Go to http://localhost:4200/
* Choose a room

### Incomplete features
* Choose room
didn't have enough tome to send the roomId dynamically through the socket

* Auth
was planning on using firebase as the auth provider but didn't have enough time

* Response of the redmis message queue as message
Although the message is retrieved to the chat_server, i didn't have enough time to send it to the socket

### Observations
> In hindsight, it wasn't that good of and idea to use socket.io since I had never before used it, my bad. (Also, the COVID-19's outbreak didin't help at all)

> I feel bad doing this huge commit.