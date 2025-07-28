word=input("Enter a word for palindrome check: ")
if (word==(word[::-1])):
    print("Palindrome")
else:
    print("not a palindrome")