network add translation

Tables in the router
==[Network Address Translation](https://www.google.com/search?q=Network+Address+Translation&sourceid=chrome&ie=UTF-8&ved=2ahUKEwi_q8ae7OOSAxVJZ_UHHRH3FLMQgK4QegYIAQgAEAY)== [(NAT)](https://www.google.com/search?q=+%28NAT%29&sourceid=chrome&ie=UTF-8&ved=2ahUKEwi_q8ae7OOSAxVJZ_UHHRH3FLMQgK4QegYIAQgAEAc) is a networking method that enables multiple devices on a private network to share a single public IP address for internet access

Acting as an intermediary, a router or firewall translates private IP addresses to a public one

which conserves limited [[IPv4]] addresses, improves security by hiding internal devices, and facilitates seamless internet connectivity




**Key Aspects of NAT**

- **Purpose:** Primarily designed to mitigate IPv4 address exhaustion.

- **Security:** By acting as a firewall, it masks internal IP addresses from the public internet.
- **Types of NAT:**
    - **Static NAT:** Maps one private address to a unique public address, commonly used for servers.
    - **Dynamic NAT:** Maps private addresses to a pool of public addresses.
    - **Port Address Translation (PAT/NAT Overload):** Allows multiple devices to share one public IP address using different ports.
- **Application:** Commonly used in home routers (connecting LAN to WAN) and enterprise firewalls.