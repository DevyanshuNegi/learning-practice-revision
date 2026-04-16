Smallest unit of K8s
Abstraction over container
Usually 1 application per pod

Each pod gets its own [[IP address]]
Pods are ephemeral ( can die easily )
	due to may not have enough resources or something
	on restart it gets a new IP

[[Service]] is used to solve this issue


![[Pasted image 20260216122312.png]]