students = [("Aarav", 80), ("Sanya", 65), ("Meera", 92), ("Rohan", 55)]

print("Students scoring above 75:")
for name, score in students:
    if score > 75:
        print(name)


total = sum(score for _, score in students)
average = total / len(students)
print(f"\nAverage Score: {average:.2f}")