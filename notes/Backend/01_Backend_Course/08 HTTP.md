

This revision sheet provides a comprehensive comparison of HTTP versions and network architectures based on the provided documentation and standard technical specifications.

---

## 🌐 Network Architectures

Before diving into HTTP, it is essential to understand the underlying ways data is exchanged.

|**Feature**|**Client-Server Architecture**|**Peer-to-Peer (P2P) Architecture**|
|---|---|---|
|**Core Concept**|Data is owned by one end (Server) and requested by another (Client)3333.|Every node (Peer) can act as both a client and a server44.|
|**Roles**|**Client:** Shows data to user; sends requests5. **Server:** Central authority; manages/stores data6.|No central authority; peers exchange data directly with each other7777.|
|**Model**|Request-Response Model8.|Decentralized Swarm9999.|
|**Examples**|Web Browsers (Google), Centralized Apps10101010.|Bit-Torrent, Blockchain, (Early) Skype11.|

---

## 🚀 HTTP Evolution Revision Sheet

HTTP (Hypertext Transfer Protocol) is an **application layer protocol**12. It is **stateless**, meaning it does not store information about previous requests, which allows it to scale easily13131313.

|**Version**|**HTTP/0.9 (1991)**|**HTTP/1.0 (1996)**|**HTTP/1.1 (1997)**|**HTTP/2 (2015)**|**HTTP/3 (2018)**|
|---|---|---|---|---|---|
|**Transport**|TCP 19|TCP 20|TCP 21|TCP 22|**QUIC (UDP-based)** 23232323|
|**Methods**|Only `GET` 24242424|Added `POST`, `HEAD` 25252525|Added `PUT`, `DELETE`, `OPTIONS`, `PATCH` 26262626|Same as 1.1|Same as 1.1|
|**Headers**|**None** 27|Introduced Headers & Status Codes 28|Mandatory **Host** header (Virtual Hosting) 29|**Header Compression** 30|**Header Compression** 31|
|**Connection**|One request per connection; closed after32.|Still closed after each request; high latency33.|**Persistent Connections** (Keep-Alive)34.|**Multiplexing** (Parallel requests on 1 TCP)35.|**Multiplexing** (Parallel requests on QUIC)36.|
|**Head-of-Line (HOL) Blocking**|N/A (Single request)|Yes 37|**Yes** (If one request stalls, all wait)38383838.|**TCP-level HOL** (Packet loss blocks all streams)39393939.|**None** (Streams are independent)40.|
|**Content**|Raw HTML only41414141.|Images, Video, CSS, JS42.|Support for Chunks & Caching (ETag)43434343.|Binary framing; Server Push44.|Built-in Encryption; Faster Handshakes45454545.|

---

### 💡 Key Terms to Remember

- **Stateless Protocol:** Each request is independent. To make it "stateful" (e.g., staying logged in), we use **Token Authentication**46464646.
    
- **Pipelining (HTTP/1.1):** Sending multiple requests without waiting for the response, but they must be returned **in order**47474747.
    
- **Multiplexing (HTTP/2 & 3):** Sending multiple requests in parallel; responses can be returned **out of order**48484848.
    
- **QUIC:** A UDP-based protocol that includes a retry mechanism for lost packets, making it faster than TCP49.
    

**Would you like me to explain the specific details of the Bit-Torrent "Swarm" (Seeders vs. Leechers) mentioned in your document?**



![[w2_02_http.pdf]]



![[Pasted image 20260120162928.png]]
![[Pasted image 20260120162942.png]]
![[Pasted image 20260120163404.png]]

![[Pasted image 20260120163754.png]]

no caching no compression
keep alive  -- -  opetional
![[Pasted image 20260120165050.png]]



![[Pasted image 20260120174419.png]]

![[Pasted image 20260120174903.png]]

 ![[Pasted image 20260120175417.png]]



![[w2_3_Http Methods and Cookies.pdf]]

