def find_patterns(digits):
    # Memoization cache to store intermediate results
    memo = {}
    
    def helper(digits):
        # Base case: empty string has one way to decode (the empty string itself)
        if not digits:
            return ['']
        
        # If we have already computed this substring, return the cached result
        if digits in memo:
            return memo[digits]
        
        patterns = []
        
        # Try using 1 digit
        if digits[0] != '0':  # Skip invalid leading zeroes
            patterns_1 = helper(digits[1:])
            letter_1 = chr(int(digits[0]) - 1 + ord('A'))
            for pattern in patterns_1:
                patterns.append(letter_1 + pattern)
        
        # Try using 2 digits
        if len(digits) > 1 and digits[0] != '0' and int(digits[:2]) <= 26:
            patterns_2 = helper(digits[2:])
            letter_2 = chr(int(digits[:2]) - 1 + ord('A'))
            for pattern in patterns_2:
                patterns.append(letter_2 + pattern)
        
        # Store the result in memo for the current substring
        memo[digits] = patterns
        return patterns
    
    return helper(digits)

# Test the function
print(find_patterns("11111111111"))
