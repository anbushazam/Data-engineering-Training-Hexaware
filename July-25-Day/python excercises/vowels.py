
sentence = input("Enter a sentence: ")


vowels = "aeiouAEIOU"


count = 0
for char in sentence:
    if char in vowels:
        count += 1


print(f"Total number of vowels: {count}")