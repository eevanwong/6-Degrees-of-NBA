From neo4j:4.2.4
ENV NEO4J_AUTH=neo4j/password
COPY data.cypher /var/lib/neo4j/import/
USER neo4j
RUN bin/neo4j-admin set-initial-password password || true && \
    bin/neo4j start && sleep 5 && \
    cat /var/lib/neo4j/import/data.cypher | NEO4J_USERNAME=neo4j NEO4J_PASSWORD=password /var/lib/neo4j/bin/cypher-shell --fail-fast
CMD [neo4j]