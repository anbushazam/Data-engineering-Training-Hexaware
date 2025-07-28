


class Person:
    def __init__(self,name:str,age:int):
        self.name=name
        self.age=age
    def display(self):
        print(f"Name:{self.name}\n"
              f'Age:{self.age}')

class Employee(Person):
    def __init__(self,employee_id:int,name,age):
        self.employee_id=employee_id
        super().__init__(name,age)
    def display(self):
        print(f"employee id:{self.employee_id}\n")
        super().display()


anbu=Employee(11,"anbu",23)
anbu.display()

#q5 method overriding-----------------

class Vehicle:
    def drive(self):
        print("THE CAR IS READY TO DRIVE")
class Car(Vehicle):
    def drive(self):
        print("THE CAR IS SMOOTHLY DRIVING")

HONDA=Car()
HONDA.drive()

