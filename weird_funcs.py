import datetime

def calc_age(birth_year):
    now = datetime.datetime.now()
    current_year = now.year
    return current_year - birth_year

def intro():
    print('Hello, what is your name?')

def fiver():
    return 100