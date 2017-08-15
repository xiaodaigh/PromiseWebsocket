# PromiseWebsocket
A simple extension of the Websocket object by making the .send method into a Promise

# Usage
```javascript
var pws = new PromiseWebsocket(url)
pws.onmessage = () => {
	console.log('onmessage trigger');
	return "something"
}

pws.send(something)	
	.then((success_obj) => {
		//this will execute when onmessage gets triggered
		// success_obj.msg this is the message sent to onmessage
		console.log(success_obj.msg)
		// if you have set .onmessage method then it returns the onmessage's returned output
		// otherwise it's null
		console.log(success_obj.onmessage_return)
	})
	.catch({
		//this will trigger if the .onerror method gets triggered
		console.log("onerror was triggered")
	})
```