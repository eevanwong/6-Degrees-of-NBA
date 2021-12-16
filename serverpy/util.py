from neo4j import GraphDatabase
from dotenv import dotenv_values
from neo4j.api import basic_auth
import os

config = dotenv_values('.env')

db_host = os.environ.get('NEO4J_HOST', 'localhost')
db_port = os.environ.get('NEO4J_PORT', '7687')
driver = GraphDatabase.driver(f'bolt://{db_host}:{db_port}', auth=basic_auth('neo4j', os.environ.get('PASS')))

def match_players(tx, player1, player2):
    # run the actual query to neo4j database, return list format
    return list(tx.run("match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*]-(n)) return p", Player1 = player1, Player2 = player2))


def parse_response(res):
    # parse the response from the db, get necessary information
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

def parse_connections(connections):
    results = []

    for i in connections[0]['p']:   
        for j in range(len((i.nodes))):
            results.append((i.nodes)[j].__dict__)

    res = []
    [res.append(x) for x in results if x not in res]  

    return parse_response(res)


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
            return parse_connections(connections)
        except:
            print("Something went wrong")
            return 'Nothing found'