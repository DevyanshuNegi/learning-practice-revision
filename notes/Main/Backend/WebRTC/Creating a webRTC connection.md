1. Browser 1 creates an `RTCPeerConnection`
		const pc = new RTCPeerConnection();
		
2. Browser 1 creates an `offer`
		pc.createOffer()
		const offer = await pc.createOffer()
		creates a [[SDP]] that you send to other side
		with no [[Ice candidates]]
		
3. Browser 1 sets the `local description` to the offer
		pc.setLocalDescription()

4. Browser 1 sends the offer to the other side through the `signaling server`
		
5. Browser 2 receives the `offer` from the `signaling server`

6. Browser 2 sets the `remote description` to the `offer`

7. Browser 2 creates an `answer`
		pc.createAnswer()
		
8. Browser 2 sets the `local description` to be the `answer`

9. Browser 2 sends the `answer` to the other side through the `signaling server`

10. Browser 1 receives the `answer` and sets the `remote description`

This is just to `establish` the `p2p` connection b/w the two parties

To actually send media, we have to

1. Ask for camera /mic permissions

2. Get the `audio` and `video` streams

3. Call `addTrack` on the `pc`

4. This would trigger a `onTrack` callback on the other side



![[Pasted image 20260219174543.png]]


after
create offer and 
create answer
we also do addIceCandidate
#doubt dont really know why and how

We will be writing the code in

1. Node.js for the Signaling server. It will be a websocket server that supports 3 types of messages

2. createOffer
3. createAnswer
4. addIceCandidate

5. React + PeerConnectionObject on the frontend
  
We’re actually building a slightly complex version of [https://jsfiddle.net/rainzhao/3L9sfsvf/](https://jsfiddle.net/rainzhao/3L9sfsvf/)