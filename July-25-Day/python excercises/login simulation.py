for i in range(1,4,1):
    user_id=input("Enter the user name:")
    password=int(input("enter the password:"))
    if (user_id=="admin"):
        if (password==1234):
            print("logged in successfully")
            break
        else:
            print("password wrong")
    else:
        print("user_name wrong")
        if(i==3):
            print("Account Locked")
