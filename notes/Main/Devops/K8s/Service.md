
DNS, Persistent, also a load balancer

Permanent [[IP address]] for every pod
so you dont have to setup new IP each time for the pod

=> lifecycle of pod and service is not connected
So if one pod dies, service stays
	![[Pasted image 20260216122343.png]]

for pod to be accessible to the internet / browser
you would make an

## External Service

URL not very usefull 
only good for testing
![[Pasted image 20260216122922.png]]

Now you need a domain name and a secure protocol
here comes [[Ingress]]

## Internal Service

