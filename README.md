Example Voting App
==================

Getting started
---------------

1. Set up Redis Ephemeral Cache in Openshift
    a. In Openshift, add a new Application by searching the Catalog for "Redis Ephemeral" and use the Template
    b. Redis Connection Password: redis_password

2. Set up the Python Vote app
    a. In Openshift, add a new Application by searching the Catalog for "Python" and use the Builder Image
    b. Git Repo URL: Inser your github repository url in wich the source code for the app is stored
    c. Select "Advanced Git Options"
        c1. Git Reference: master
        c2. Context Dir: /vote
    d. Application Name: Vote-Application
    e. Name: vote-python
    f. Resource type to generate: Deployment
    g. Create a route to the application: Yes

3. Set up the PostgreSQL database
    a. In Openshift, add a new Application by searching the Catalog for "Postgre" and use the Template
    b. Database Service Name: db
    c. PostgreSQL Connection Username: postgres_user
    d. PostgreSQL Connection Password: postgres_password
    e. PostgreSQL Database Name: postgres
    f. Volume Capacity: 100Mi
    g. Memory Limit: 100Mi

4. Set up the Nodejs Result app
    a. In Openshift, add a new Application by selecting "From Dockerfile" as the method of choice
    b. Git Repo URL: Inser your github repository url in wich the source code for the app is stored
    c. Select "Advanced Git Options"
        c1. Git Reference: master
        c2. Context Dir: /result
    d. Application: Vote-Application
    e. Name: result-nodejs
    f. Resource type to generate: Deployment
    g. Create a route to the application: Yes

5. Set up the Java Worker app
    a. In Openshift, add a new Application by selecting "From Dockerfile" as the method of choice
    b. Git Repo URL: Inser your github repository url in wich the source code for the app is stored
    c. Select "Advanced Git Options"
        c1. Git Reference: master
        c2. Context Dir: /worker
    d. Application: Vote-Application
    e. Name: worker-java
    f. Resource type to generate: Deployment
    g. Create a route to the application: No

Architecture
-----

![Architecture diagram](architecture.png)

* A Python webapp which lets you vote between two options
* A Redis queue which collects new votes
* A Java worker which consumes votes and stores them in a Postgres database
* A Postgres database backed by a volume
* A Node.js webapp which shows the results of the voting in real time


Note
----

The voting application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.

testing git integration