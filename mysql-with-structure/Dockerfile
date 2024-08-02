FROM mysql:8.1.0

COPY . .

ADD ./weather_data_db.sql /docker-entrypoint-initdb.d
