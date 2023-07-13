FROM postgres
ENV POSTGRES_USER=jossue
ENV POSTGRES_PASSWORD=jossue2002
ENV POSTGRES_DB=proyecto
COPY init.sql /docker-entrypoint-initdb.d/
#COPY tables.sql /docker-entrypoint-initdb.d/
EXPOSE 5432