The Candidate-Elimination Algorithm

**Goal:** Output a description of the set of _all_ hypotheses consistent with the training examples. It finds the entire Version Space. **Rule:** It uses _both_ positive and negative examples to narrow down the space from both ends.

**Rule:** It uses _both_ positive and negative examples to narrow down the space from both ends.

You track two boundaries:

- **S (Specific Boundary):** Starts at ⟨Ø,Ø,Ø⟩. Moves "up" to become more general.
    
- **G (General Boundary):** Starts at ⟨?,?,?⟩. Moves "down" to become more specific.
    

**The Mechanism (How the boundaries move):**

1. **When you see a POSITIVE example:**
    
    - Generalize S just enough to cover it (exactly like FIND-S).
        
    - Remove any rules from G that do not cover this example.
        
2. **When you see a NEGATIVE example:**
    
    - S does nothing. (It only cares about positive examples).
        
    - Specialize G just enough to _exclude_ this negative example, while making sure G still covers all previous positive examples.
        

Eventually, S and G converge. Everything trapped between them is your **Version Space**.

