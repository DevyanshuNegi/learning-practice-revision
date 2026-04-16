
Usually you would configure DB url and env in the build application

eg if endpoint or secret changes :
then 
	reublid
	push to repo
	pull to your pod
	restart

so we have [[ConfigMap]]

Containes config data like urls and database and we just connect it to the pod
now 
	just have to change the config map and dont need to build a new image
	
	
	may also be user name and password
	but its not secure in plain text format even though its an
	
![[Pasted image 20260216123534.png]]so for this purpose we have [[Secret]]