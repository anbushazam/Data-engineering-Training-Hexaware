class InsufficientFundsError(Exception):
    def __init__(self,message="not valid"):
        self.message=message
        super().__init__()





class BankAccount:

    def __init__(self,holder_name:str,balance:int):
        self.holder_name=holder_name
        self.balance=balance
    def deposit(self,amount):
        if amount<=0:
            raise InsufficientFundsError("Deposit amount must be positive:")
        self.balance=self.balance+amount
        print(f"Deposited {amount:.2f}. New balance: {self.balance:.2f}")

    def withdraw(self,amount):
        if amount>self.balance:
            raise InsufficientFundsError("Insufficient fund!")
        self.balance=self.balance-amount
        print(f"Withdrew {amount:.2f}. New balance: {self.balance:.2f}")

bb=BankAccount("dhanu",3000)
bb.deposit(7000)
bb.withdraw(3000)

# inheritance Q4---------------
class SavingsAccount(BankAccount):
    def __init__(self, holder_name, balance=0.0, interest_rate=0.02):
        super().__init__(holder_name, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):

        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Applied interest: {interest:.2f}. New balance: {self.balance:.2f}")
        return interest


acct = SavingsAccount("Anbu", balance=1000.0, interest_rate=0.05)
acct.apply_interest()
acct.withdraw(200)
