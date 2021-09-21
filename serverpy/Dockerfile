FROM python:3.9-alpine

# author
LABEL author='evan'

# extra metadata
LABEL version="1.0"
LABEL description="6-Degrees flask microservice"

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV URI = bolt://localhost:7687
ENV USER = neo4j
ENV PASS = neo4j
# ENV PORT = 5000

CMD [ "flask", "run", "--host=0.0.0.0"]

# cd to serverpy
# build the image with  $ docker build -t six-deg-flask .
# run image as a container with  $ docker run six-deg-flask
# publish host's port 5000 to container's port 5000 with $ docker run --publish 5000:5000 six-deg-flask
 

