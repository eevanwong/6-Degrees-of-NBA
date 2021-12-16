#see express server for needed refactors 

import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from neo4j import GraphDatabase
from dotenv import dotenv_values
from neo4j.api import basic_auth
config = dotenv_values('.env')

db_host = os.environ.get('NEO4J_HOST', 'localhost')
db_port = os.environ.get('NEO4J_PORT', '7687')
driver = GraphDatabase.driver(f'bolt://{db_host}:{db_port}', auth=basic_auth('neo4j', os.environ.get('PASS')))

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

@app.route('/')
@cross_origin()
def hello():
    d = {
        'message': "YELLLOW"
    }
    return d

def match_players(tx, player1, player2):
    return list(tx.run("match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*]-(n)) return p", Player1 = player1, Player2 = player2))


def parseResponse(res):
    for i in res:
        i.pop('_graph');
        if ("Player" in i['_labels']):
            i['_labels'] = "Player"
        else:
            i['_labels'] = "Team"
        labels = i['_labels']
        properties = i['_properties']
        i.pop('_labels')
        i.pop('_properties')
        i['labels'] = labels
        i['properties'] = properties

    return res

def parseConnections(connections):
    results = []

    for i in connections[0]['p']:   

        for j in range(len((i.nodes))):
            results.append((i.nodes)[j].__dict__)

    res = []
    [res.append(x) for x in results if x not in res]  

    return parseResponse(res)


def query_database(player1, player2):
    connections = []

    try:
        with driver.session() as session:    
            connections = session.read_transaction(match_players, player1, player2)

    except:
        print('something went wrong')
        return 'nothing found'

    if len(connections) == 0:
        return connections
    else:
        try:
            return parseConnections(connections)
        except:
            print("Something went wrong")
            return 'Nothing found'

@app.route('/get-connections', methods=['GET'])
@cross_origin()
def get_connections():    
    if request.method == 'GET':
        player1 = request.args['player1'].lower()
        player2 = request.args['player2'].lower()
        
        print(player1 + ' ' + player2)
        results = jsonify(query_database(player1,player2))
        return results, 200
    

