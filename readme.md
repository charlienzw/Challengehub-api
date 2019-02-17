# The is an API for Challengehub mobile app

## Routing Table

| Method   | URL                                            |  Body                                                                                     |
| -------- | ---------------------------------------------- |  ---------------------------------------------------------------------------------------- |
| GET      | [server_url]/appusers                          |                                                                                           |
| POST     | [server_url]/appusers                          |  { name: [name], deviceId: [deviceId] }                                                   |
| GET      | [server_url]/appusers/[deviceId]               |                                                                                           |
| GET      | [server_url]/challenges                        |                                                                                           |
| POST     | [server_url]/challenges                        |  { name: [name], desc: [desc], prize: [prize], userId: [userId] }                         |
| POST     | [server_url]/trends                            |  { userId: [userId], videoId: [videoId] }                                                 |
| POST     | [server_url]/videos                            |  { userId: [userId], name: [name], liveStream: [liveStream], challengeId: [challengeId] } |
| GET      | [server_url]/videos/[challengesId]             |                                                                                           |
| GET      | [server_url]/videos/getVideoByName/[videoName] |  

## Demo Server_url
https://hackuci-232005.appspot.com