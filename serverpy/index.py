import os
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from neo4j import GraphDatabase
from dotenv import dotenv_values

config = dotenv_values('.env')

players = {}

uri = config['URI']
driver = GraphDatabase.driver(uri, auth=(config['USER'], config['PASS']))

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/')
def hello():
    d = {
        'message': "YELLLOW"
    }
    return d

def match_players(tx):
    return list(tx.run("match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*]-(n)) return p", Player1 = players['player1'], Player2 = players['player2']))

@app.route('/getConnections', methods=['GET', 'POST'])
def get_connections():
    if request.method == 'GET':
        results = []
        connections = []

        try:
            with driver.session() as session:
                connections = session.read_transaction(match_players)
        except:
            return "NMF"
        
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
        
        #WHY FOR THE LOVE OF GOD IS PROPERTIES NOT AN ATTRIBUTE OF NODE???? IT LEGIT SAYS THAT RIGHT THERE

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

        print(res)

        return jsonify(res)
    
    elif request.method == 'POST':
        players['player1'] = request.args['player1'].lower()
        players['player2'] = request.args['player2'].lower()
        print(players)
        return { 'message': players }

    

