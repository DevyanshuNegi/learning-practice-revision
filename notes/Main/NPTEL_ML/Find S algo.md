**Goal:** Find the _Most Specific_ hypothesis (S) that fits all the **Positive** examples. **Rule:** It ==completely ignores negative examples.==

**The Notation:**

- `Ø` = Ultimate Specific (Rejects everything).
    
- `?` = Ultimate General (Accepts everything).
    
- `Value` (e.g., 'Sunny') = Only accepts this specific thing.
    

**The Step-by-Step Mechanism:** Imagine predicting if a person will get a sunburn based on `[Sun, Wind]`.

1. **Initialize:** Start with the most restrictive rule possible: h=⟨Ø,Ø⟩.
    
2. **Example 1 (Positive):** `[High, Low] -> Sunburn (Yes)`.
    
    - Update h to match the first positive instance: h=⟨High,Low⟩.
        
3. **Example 2 (Negative):** `[High, High] -> Sunburn (No)`.
    
    - _Ignore it._ FIND-S doesn't care about negative examples.
        
4. **Example 3 (Positive):** `[Moderate, Low] -> Sunburn (Yes)`.
    
    - Compare with our current h=⟨High,Low⟩.
        
    - The 'Wind' matches (Low = Low). The 'Sun' does not match (High = Moderate).
        
    - If a feature clashes, we generalize it to `?`.
        
    - **New h:** ⟨?,Low⟩.
        

**Result:** The final rule is "As long as Wind is Low, they get a sunburn."