import requests
import json
from .sentences import sentences


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
    
    data = response_data['data']
    for question in data:
        question["question_weight"] = 3
    

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



def get_sentences():
    # call the sentence generation api when it is finished to get the sentences  
    return sentences

    
def order_sentences(sentences, score):
    order_function = lambda sentence: abs(sentence["score"] - score)
    ordered_sentences = sorted(sentences, key= order_function)
    return ordered_sentences


def get_closeset_sentences(final_score):
    # Get the sentences from the sentence generation API
    sentences = get_sentences()
    
    # Order the sentences according to their closenes to the final score
    ordered_sentences = order_sentences(sentences, final_score)
    
    # return the final answer
    return {
        "final_score": final_score,
        "closest_sentences": ordered_sentences
    }






