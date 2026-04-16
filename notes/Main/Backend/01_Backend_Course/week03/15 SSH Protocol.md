

![[w03_2_SSH.pdf]]




Secure Shell


Earlier
		Telnet
		RSH ( Remote Shell )
			Prone to man in the middle

Use cases
	1. Remote command execution
	2. Secure file sharing
	3. [[SSH Tunneling or Port forwarding]]

Uses Client Server Archetecture

ssh -v

## Wireshark

tcp.port == 22
wifi

3 way handshake
then both send thir own version and what they support
![[Pasted image 20260124114219.png]]
then 3 ACK messages TCP
Then Key exchange
both sending encription algo to each other
![[Pasted image 20260124114333.png]]
chacha20 in this case
Client Starts [[Diffie-Hellman Key Exchange Algo]]
![[Pasted image 20260124114431.png]]

client server gnerate shared secret

Now all data is encripted 

![[Pasted image 20260124114632.png]]

SSH creates mulitple channels on a single connection




## Authentication in SSH
1. Password : Less secure ( not preferable )
2. ssh key  :  recommended and secure

Disable root login
Disable password auth
![[Pasted image 20260124115039.png]]

![[Pasted image 20260124160729.png]]
ls -la
for viewing permissions
