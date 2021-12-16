from flask import Flask, request
from flask_cors import CORS, cross_origin
from controllers import get_connections


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

@app.route('/get-connections', methods=['GET'])
@cross_origin()
def connections():
    return get_connections(request)

    

