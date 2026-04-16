


[[SOCKS5_PROXY]]

[[Danted]]

- **Delete everything** and paste this exact "Blind Forwarding" config. It includes the critical `resolveprotocol: fake` line.

[[SSH Tunneling or Port forwarding]]

The error message tells us exactly what happened. You successfully set up the "God Mode" tunnel, **BUT** your Go worker is still trying to call the old "Public" phone number instead of the new "Local" tunnel.

**The Error:**

> `dial tcp 107.173.82.52:1080: connect: connection refused`

**Translation:** Your Go code tried to connect to the **RackNerd Public IP (`107...`)**. Since we stopped Dante (to switch to God Mode), nobody picked up the phone.

You need to tell Go to connect to **Localhost (`127...`)**, where your SSH tunnel is waiting.