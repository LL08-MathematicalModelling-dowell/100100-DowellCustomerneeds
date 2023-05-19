import requests


def fetch_q1_data(request):
    url = "https://script.google.com/macros/s/AKfycbzY_xV-3nFoe9bbKQHV7FIZSEK1QhpXWcMXmzaBC0iLKicZzY9MUds2abAdTnME8tEa/exec"

    response = requests.get(url)
    data = response.json()
    return data


def fetch_q2_data(request):
    url = "https://script.google.com/macros/s/AKfycbyWzZe0_yXK9WDOsZyXm6MX3C9C6GESTVuCbOneew3DXAFPUIy3D3aQ6WPx48Ty5U0h/exec"

    response = requests.get(url)
    data = response.json()
    return data


def fetch_q3_data(request):
    url = "https://script.google.com/macros/s/AKfycbzcTPohhNI0YjCl8OyZumciAgJfkFKdCKG_clNC_0TUYDywdxtHtQgiqWIet8VQYlk/exec"

    response = requests.get(url)
    data = response.json()
    return data
