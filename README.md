# Example Voting App
==================

## Note

*This works best in conjunction with the "OpenShift for the Absolute Beginner" Course in Udemy.  The course is old, and some information is outdated.  This Repo and the following instructions should be used during Section 7, lesson 34 "Demo - Deploy Example Voting application on OpenShift" Follow the path of the video, and reference the longform instructions here* 

## Instructions

1. Set up Redis Ephemeral Cache in Openshift
    1. In Openshift, add a new Application by searching for "Redis Ephemeral Template", select the result from the openshift/origin repository on Github
    2. Redis Connection Password: `redis_password`

2. Set up the Python Vote app
    1. In Openshift, add a new Application by searching the Catalog for "Python" and use the Builder Image
    2. The app name should be `vote`
    3. Git Repo URL: Insert your GitHub repository URL in which the source code for the app is stored
    4. Select "Advanced Git Options"
        1. Git Reference: master
        2. Context Dir: `/vote/src/vote-python`
    5. Resource type to generate: Deployment
    6. Create a route to the application: Yes

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
    b. Git Repo URL: Inser your github repository url in which the source code for the app is stored
    c. Select "Advanced Git Options"
        c1. Git Reference: master
        c2. Context Dir: /result
    d. Application: Vote-Application
    e. Name: result-nodejs
    f. Resource type to generate: Deployment
    g. Create a route to the application: Yes

5. Set up the Java Worker app
    a. In Openshift, add a new Application by selecting "From Dockerfile" as the method of choice
    b. Git Repo URL: Inser your github repository url in which the source code for the app is stored
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

The voting application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.  You can use incognito/privte browser tabs to register multiple votes.
