#see express server for needed refactors 

import os
from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from neo4j import GraphDatabase
from dotenv import dotenv_values
config = dotenv_values('.env')

db_host = os.environ.get('NEO4J_HOST', '172.19.0.2')
db_port = os.environ.get('NEO4J_PORT', '7687')
print(f'bolt://{db_host}:{db_port}')
driver = GraphDatabase.Driver(f'bolt://{db_host}:{db_port}')

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

@app.route('/')
def hello():
    d = {
        'message': "YELLLOW"
    }
    return d

def match_players(tx, player1, player2):
    return list(tx.run("match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*]-(n)) return p", Player1 = player1, Player2 = player2))

def parseConnections(connections):
    results = []
    print(connections)
    for i in connections[0]['p']:   

        for j in range(len((i.nodes))):
            results.append((i.nodes)[j].__dict__)

    res = []
    [res.append(x) for x in results if x not in res]  
    print(res)

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

    # print(res)

    return jsonify(res)


def query_database(player1, player2):
    connections = []

    try:
        with driver.session() as session:    
            connections = session.read_transaction(match_players, player1, player2)

    except:
        print('something went wrong')
        return Response('something went wrong', status=404)

    if len(connections) == 0:
        return 'No connections found',204 # if nothing about connections
    else:
        try:
            return Response(parseConnections(connections), status=400, mimetype='application/json')
        except:
            print("Something went wrong")
            return Response(status=404)

    #print connections: 
    # [<Record p=<Path start=<Node id=5660 labels=frozenset({'Player'}) properties={'name': 'lebron james'}> end=<Node id=4882 labels=frozenset({'Player'}) properties={'name': 'james harden'}> size=4>>]

    #print(type(connections[0])) 
    #<Record p=<Path start=<Node id=5660 labels=frozenset({'Player'}) properties={'name': 'lebron james'}> end=<Node id=4882 labels=frozenset({'Player'}) properties={'name': 'james harden'}> size=4>>
    #<class 'neo4j.data.Record'> 

    #print((connections[0]['p']))
    #<Path start=<Node id=5660 labels=frozenset({'Player'}) properties={'name': 'lebron james'}> end=<Node id=4882 labels=frozenset({'Player'}) properties={'name': 'james harden'}> size=4>
    #<class 'neo4j.graph.Path'>

    #print(list(connections[0]['p'])[0])

    # print(connections)

    # for record in connections:
    #     print(type(record[0].nodes))    




@app.route('/getConnections', methods=['POST'])
def get_connections():    
    if request.method == 'POST':
        player1 = request.args['player1'].lower()
        player2 = request.args['player2'].lower()
        
        print(player1 + ' ' + player2);
        results = query_database(player1,player2)

    

