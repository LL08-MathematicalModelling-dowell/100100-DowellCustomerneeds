import requests
import json


def get_filtered_data(request):
    url = "http://uxlivinglab.pythonanywhere.com/"
    payload = {
        "cluster": "undefined",

        "database": "1BO2JxN8t3yCuxb5sxQxZk3rQ7qw2cztvp78S-xRMDNg",

        "collection": "index1",

        "document": "index1",

        "team_member_ID": "1182",

        "function_ID": "ABCDE",

        "command": "fetch",

        "field": {},
        "update_field": {
            "order_nos": 21
        },
        "platform": "bangalore"
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, json=payload)
    input_data = json.loads(response.json())

    headers = input_data['data'][0]

    converted_data = []

    for row in input_data['data'][1:]:
        converted_row = {}
        for i, value in enumerate(row):
            converted_row[headers[i]] = value
        converted_data.append(converted_row)

    filtered_data = [data for data in converted_data if any(value != "0" for key, value in data.items())]

    return filtered_data
