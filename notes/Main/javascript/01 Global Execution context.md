

running js code we have 2 phases

- Memory phase
	- declaration
- Code phase
	- initialization

This all this is deleted

![[Pasted image 20260402091231.png]]

![[Pasted image 20260402091828.png]]

when encounter a function
put full body in the mem area.


![[Pasted image 20260402092022.png]]

this way, global function is undefined over there
and only get the real value when it reaches the line.


[[Hoisting]]
  
![[Pasted image 20260402092648.png]]


Let and const also get hoisted but does not get value due to TDZ temporal dead zone

