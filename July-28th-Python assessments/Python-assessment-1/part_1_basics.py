word=input("enter a string to check for plaindrome:")
reword=word[::-1]
if word==reword:
    print("It is a plaindrome")
else:
    print("its not a palindrome")