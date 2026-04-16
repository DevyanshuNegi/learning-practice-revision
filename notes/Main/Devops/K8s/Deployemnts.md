Another layer of abstraction on top of pods

so in practice we will mostly be working with Deployemnts and not with pods

what about the database pod
	we cannot replicate database 
	![[Pasted image 20260216130401.png]]
	we have to manage which pods are reading and writing to the db
	to avoid any inconsistencies

This is offered by another K8s component called [[StatefulSet]]
![[Pasted image 20260216130519.png]]