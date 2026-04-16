
why ?
trend from Monolith to Microservices
increase usave of container
demand for proper way to manage them


High Availability
Scalability
Disaster recovery : backup and restore


Archetecture
Master => worker
![[Pasted image 20260216014338.png]]

![[Pasted image 20260216014507.png]]

![[Pasted image 20260216014536.png]]

![[Pasted image 20260216014609.png]]

![[Pasted image 20260216014618.png]]

![[Pasted image 20260216014648.png]]


[[Deployemnts]] : Another layer of abstraction on top of pods
[[Pod]]  :  Smallest unit of K8s
	[[Service]]
		[[ConfigMap]]

[[Volume]]
[[StatefulSet]]
[[Secret]]
[[DaemonSet]]
[[Ingress]]
[[DaemonSet]]


worker node or node -> physical or vm
[[Pod]] is the smallest unit of kubernetes it is just the abstraction above a container

In prod we need distributed system and containers
so we have replica of all
Replica is also connected to the same [[Service]]

for replicas of pod
	you need to make a blueprint for "my-app" Pods

so you would not be working with pods, you will work with [[Deployemnts]]


Finally with all the config our application have full uptime and can recover
![[Pasted image 20260216131123.png]]


![[Pasted image 20260216131216.png]]
![[Pasted image 20260216131227.png]]
![[Pasted image 20260216131242.png]]

![[Pasted image 20260216131256.png]]