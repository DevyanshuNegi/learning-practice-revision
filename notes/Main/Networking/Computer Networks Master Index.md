
 **Tags:** #backend #systems-engineering #cs-fundamentals #interview-prep

_(Note: Topics marked with 🎯 are in-scope for the Modules 1-2.5 Midterm)_

### 0. The Fundamentals & Topologies

- [[The OSI Model]] 🎯 - _(Understand what happens at each of the 7 layers)_
    
- [[TCP-IP Suite]] 🎯 - _(The actual model the internet uses)_
    
- [[Network Topologies]] 🎯 - _(Star, Mesh, Bus, Ring - Pros & Cons)_
    
- [[Types of Networks]] 🎯 - _(LAN, MAN, WAN)_
    
- [[Switching Techniques]] 🎯 - _(Circuit Switching vs. Packet Switching)_
    

### 1. The Physical Layer (L1)

- [[Transmission Media]] 🎯 - _(Guided vs. Unguided: Twisted Pair, Coaxial, Fiber Optics)_
    
- [[Signal Encoding & Modulation]] 🎯 - _(Digital to Digital, Analog to Digital)_
    
- [[Multiplexing Techniques]] 🎯 - _(FDM, TDM, WDM)_
    

### 2. The Data Link Layer (L2)

- [[Framing Methods]] 🎯 - _(Character count, Byte & Bit stuffing)_
    
- [[Error Detection: Parity & Checksums]] 🎯
    
- [[Error Detection: CRC]] 🎯 - _(Cyclic Redundancy Check - heavily tested numerically)_
    
- [[Error Correction: Hamming Code]] 🎯 - _(Calculating error bits)_
    
- [[Flow Control: ARQ Protocols]] 🎯 - _(Stop-and-Wait, Go-Back-N, Selective Repeat)_
    
- [[MAC Addressing & ARP]] - _(How IPs map to physical hardware)_
    
- [[Multiple Access: ALOHA]] 🎯 - _(Pure vs. Slotted)_
    
- [[Multiple Access: CSMA Suite]] 🎯 - _(CSMA, CSMA-CD, CSMA-CA)_
    

### 3. The Network Layer (L3)

- [[Connectionless vs Connection-Oriented Services]] 🎯 - _(Datagrams vs. Virtual circuits)_
    
- [[IPv4 vs IPv6]] - _(Packet structures and differences)_
    
- [[Classful IP Addressing]] 🎯 - _(Class A, B, C, D ranges and masks)_
    
- [[Subnetting & CIDR]] 🎯 - _(Calculating network boundaries - heavily tested numerically)_
    
- [[Routing Protocols Overview]] - _(OSPF, BGP - how routers find the path)_
    
- [[NAT (Network Address Translation)]] - _(How local networks talk to the public web)_
    

### 4. The Transport Layer (L4)

- [[TCP vs UDP]] - _(When to use which. Crucial for custom backend protocols)_
    
- [[TCP 3-Way Handshake & Teardown]] - _(SYN, SYN-ACK, ACK)_
    
- [[TCP Congestion Control]] - _(Slow start, congestion avoidance)_
    
- [[Ports & Sockets]] - _(How processes actually communicate)_
    

### 5. The Application Layer (L7)

- [[DNS Deep Dive]] - _(How domain resolution actually works under the hood)_
    
- [[HTTP Evolution]] - _(HTTP/1.1 vs HTTP/2 vs HTTP/3/QUIC)_
    
- [[WebSockets & WebRTC]] - _(For real-time bidirectional communication)_
    
- [[MQTT Protocol]] - _(Pub/Sub architecture for IoT and low-bandwidth scenarios)_