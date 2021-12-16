from flask import jsonify
from util import query_database

def get_connections(request):
    player1 = request.args['player1'].lower()
    player2 = request.args['player2'].lower()
    
    print(player1 + ' ' + player2)
    results = jsonify(query_database(player1,player2))
    return results, 200