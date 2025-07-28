def factorial(n):

    if n < 0:
        raise ValueError("Negative numbers do not have a factorial.")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


print(factorial(5))   
print(factorial(0))