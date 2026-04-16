![[Pasted image 20260216130537.png]]

Usually ment for databases 
DB must always use 
[[StatefulSet]] : for scalling + replicating  + sync reads and writes  and no DB inconsistencies
and not
[[Deployemnts]] : for replicating pods & scalling up and down the pods for 


Difficult to work with

Host db applications outside K8s cluster and just have deployments ( Stateless applicatoins ) and communicate with external database
![[Pasted image 20260216131027.png]]



