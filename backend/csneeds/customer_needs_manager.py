import requests
import json


DB_URL = "https://datacube.uxlivinglab.online/db_api/crud/"
API_KEY = "wp#!zf&}GPiy06'7'G%3:6]l;].V|<[KIsmlGZCcgm9Enx664fi1psHbJWBM1FZK"


def fetch(coll_name):
    data = {
        "api_key": API_KEY,
        "operation":"fetch",
        "db_name": "customer_needs",
        "coll_name": coll_name,
        "filters": {}
    }


    response = requests.get(DB_URL, data=data)
    try:
        response_data = json.loads(response.text)
    except Exception as e:
        return {'isSuccess':True, 'error': str(e)}
    

    return {'isSuccess':True, 'data': response_data}


def fetch_q1_data():

    response = fetch('question_1_weight')

    return response['data']


def fetch_q2_data():
    response = fetch("question_2_weight")

    return response['data']

def fetch_q3_data():
    response = fetch("question_3_weight")
    return response['data']


def fetch_tags():
    response = fetch("tags_master")
    return response['data']









