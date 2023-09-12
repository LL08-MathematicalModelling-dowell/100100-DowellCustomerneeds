import requests
import json


DB_URL = "http://74.50.86.117/db_api/crud/"


def fetch(url, data):



    response = requests.get(url, data=data)


    print(response.text)

    return json.loads(response.text)

def fetch_q1_data():
    data = {
        'db_name': "customer_needs",
        'coll_name': "question_1_weight",
        'operation': "fetch",
        'data':""
    }

    response = fetch(DB_URL, data)

    return response['data']


def fetch_q2_data():
    data = {
        'db_name': "customer_needs",
        'coll_name': "question_2_weight",
        'operation': "fetch",
        'data':""
    }

    response = fetch(DB_URL, data)

    return response['data']

def fetch_q3_data():
    data = {
        'db_name': "customer_needs",
        'coll_name': "question_3_weight",
        'operation': "fetch",
        'data':""
    }

    response = fetch(DB_URL, data)

    return response['data']


def fetch_tags():
    data = {
        'db_name': "customer_needs",
        'coll_name': "tags_master",
        'operation': "fetch",
        'data':""
    }

    response = fetch(DB_URL, data)

    return response['data']









