



![[Pasted image 20260120203555.png]]


mkcert for local ssl



![[Pasted image 20260120205431.png]]


![[Pasted image 20260120210328.png]]![[Pasted image 20260120210337.png]]

There is this default behaviour of browser 
	if you dont specify domain it automatically adds server domain with cookie
	also there will be .domain.com <- means all the subdomains included
	cookies will be sent to all subdomains also
	
But if you dont specify domain then will by default 


![[Pasted image 20260120220044.png]]
![[Pasted image 20260120220120.png]]
only be sent for the path
![[Pasted image 20260120220752.png]]
this httpOnly att in cookies is used to prevent cross site scripting cookies 
to protect this attack on your website you must use this

![[Pasted image 20260120220946.png]]
This is to protect MITM attack 
then cookies only be sent to secure sites

![[Pasted image 20260120221117.png]]

![[Pasted image 20260120221234.png]]
default is lax
None : will be sent to all the domains
	even for the domains with different names
Lax : only main and subdomain can access
	will not send to cross domain
Strict : a bit interesting

![[Pasted image 20260120223034.png]]