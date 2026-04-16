
WebRTC is the core/only protocol that lets you do `real time media communication` from inside a browser.

You use WebRTC for applications that require sub second latency.
Examples include
1. Zoom/Google meet (Multi party call)
2. Omegle, teaching (1:1 call)
3. 30FPS games (WebRTC can also send data)

Good open source project : [[lifekit]]

[[HLS]] have higher latency but very good for streaming cricket mathes

BOOK : [[webRTC for the curious]]


## WebRTC

P2P communication
![[Pasted image 20260219013525.png]]little bit insecure



[[Signalling Server]]  : server to init rtc connection and other things

[[Stun]]  : 
	[[NAT]]  network add translation
	because IP for all the port is the same . . . 
	It gives you back your publically accessable IPs. It shows you how the world sees you

Still after all this there are many chances that browser wont recieve data from other browser/machine
because router expect data to come from [[Stun]] server
which initialized the conneciton

This is where a [[Turn]] server comes into the picture
we wont need turn server for 95% of the calls
but for 5 % you need it



[[SDP]] : Session description protocol

[[RTCPeerConnection]]


### Summary

You need a `signaling server`, `stun server` to initiate the webrtc conn b/w the parties. You can kill these once the conn is made.

You need to include a `turn server` in case any of the users are on a restrictive network so you can get back a `turn` ice candidate as well.


#code
#tip
chrome about/webrtc-internals
to see internals about webrtc


## [[Creating a webRTC connection]]



## How zoom , meet does it ?

[[SFU]]

Selective forwarding unit

#notgot
40:00
video : webrtc2 conding on react frontend


#new 
react strict mode
