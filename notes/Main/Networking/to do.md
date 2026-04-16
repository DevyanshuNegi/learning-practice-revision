
I wanna learn networking and about the IP addresses, tell me some different commands and how to read logs, how to know which IP to use where, which is public / private / internal ip all those kind of stuff. are there default IP given to the machines and what ?
I'll give you a comprehensive overview of networking concepts and practical commands to explore IP addresses on your system.

IP Address Types

Private IP Addresses (RFC 1918):
•  10.0.0.0 - 10.255.255.255 (Class A)
•  172.16.0.0 - 172.31.255.255 (Class B)
•  192.168.0.0 - 192.168.255.255 (Class C)

These are used within local networks and are not routable on the internet.

Public IP Addresses: Assigned by ISPs, globally unique, routable on the internet. Your machine gets one when connected directly to the internet.

Loopback/Localhost: 127.0.0.1 (IPv4) or ::1 (IPv6) — used for local testing, points to your own machine.

Link-Local: 169.254.0.0 - 169.254.255.255 — assigned automatically when DHCP fails.

Essential Commands

View all network interfaces and IPs:
bash
View routing table (shows default gateway and route destinations):
bash
Check your public IP (requires internet):
bash
View DNS configuration:
bash
Test connectivity to a host:
bash
See open ports and network connections:
bash
Trace route to a destination:
bash
See which process is using a port:
bash
Display network statistics:
bash
Reading Network Logs

System logs (journalctl on systemd systems):
bash
Network interface statistics:
bash
Connection tracking (live connections):
bash