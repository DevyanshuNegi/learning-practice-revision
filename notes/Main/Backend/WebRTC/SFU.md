
Single forwarding unit

allows you to do optimizations like :
	Stopping poeple's videos
	quality of vids
	vids in paginated manner

[[mediasoup]] : open source sfu

[[pion]] Pure Go implementation of the WebRTC


![[Pasted image 20260219185545.png]]



### MCU

It mixes audio/video together on the server before forwarding it.

This means it needs to

1. decode video/audio (using something like ffmpeg)

2. Mix them (create a video canvas/create a single audio stream)

3. Send out the merged audio stream to everyone


![[Pasted image 20260219195151.png]]


