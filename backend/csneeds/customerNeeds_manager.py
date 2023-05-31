import requests


def fetch_q1_data(request):
    url = "https://script.google.com/macros/s/AKfycbzY_xV-3nFoe9bbKQHV7FIZSEK1QhpXWcMXmzaBC0iLKicZzY9MUds2abAdTnME8tEa/exec"

    response = requests.get(url)
    data = response.json()
    return data


def fetch_q2_data(request):
    url = "https://script.google.com/macros/s/AKfycbz3Q5QbS-rwYo0OCwPPg7On6dPESPglRmQNbdhK3GQlRJRh23BnCXK1mKnY5775lsm-/exec"

    response = requests.get(url)
    data = response.json()
    return data


def fetch_q3_data(request):
    url = "https://script.google.com/macros/s/AKfycbztX-CX89Ad1d75WCnyqewERJUJDsOcYh1qkTDLtWe7PCdKVJR7ZPu-4_p6-8sAeeU/exec"

    response = requests.get(url)
    data = response.json()
    return data
