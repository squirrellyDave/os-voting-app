# Example Voting App

## Setup

This works best in conjunction with the "OpenShift for the Absolute Beginner" Course in Udemy.  The course is old, and some information is outdated.  This Repo and the following instructions should be used during Section 7, lesson 34 "Demo - Deploy Example Voting application on OpenShift" Follow the path of the video, and reference the longform instructions here

## Instructions

1. Set up Redis Ephemeral Cache in Openshift
    1. search for "Redis Ephemeral Template", select the result from the openshift/origin repository on Github
        1. Copy the contents of the template to your clipboard.
    2. In Openshift, add a new Application using the "Add to Project" Menu and selecting "Import from YAML/JSON"
        1. Paste the contents of the GitHub template into the text box.
    3. Save, but uncheck the "Process Template" checkbox, and check the "Save Template" checkbox.  This will create an icon in the catalog, which can be seen after refreshing the page.
    4. Select the "Redis (Ephemeral)" app from the catalog.
    5. Redis Connection Password: `redis_password`

2. Set up the Python Vote app
    1. In Openshift, add a new Application by searching the Catalog for "Python"
    2. The app name should be `vote`
    3. Git Repo URL: Insert your GitHub repository URL in which the source code for the app is stored
    4. Select "Advanced Git Options"
        1. Git Reference: master
        2. Context Dir: `/vote/src/vote-python`
    5. Resource type to generate: Deployment
    6. Create a route to the application: Yes

3. Set up the PostgreSQL database
    1. In Openshift, add a new Application by searching the Catalog for "Postgres"
    2. Database Service Name: `db`
    3. PostgreSQL Connection Username: `postgres_user`
    4. PostgreSQL Connection Password: `postgres_password`
    5. PostgreSQL Database Name: `postgres`
    6. Volume Capacity: 100Mi
    7. Memory Limit: 100Mi

4. Set up the Nodejs Result app
    1. In Openshift, add a new Application by selecting "NodeJs"
    2. Name: result
    3. Git Repo URL: Insert your GitHub repository URL in which the source code for the app is stored
    4. Select "Advanced Git Options"
    5. Git Reference: master
    6. Context Dir: `/result/src/result-nodejs`
    7. Resource type to generate: Deployment
    8. Create a route to the application: Yes

5. Set up the Java Worker app
    1. Deploy the wrong app
        1. In Openshift, add a new Application by selecting "Apache HTTP Server"
        2. Name: worker
        3. Git Repo URL: Insert your GitHub repository URL in which the source code for the app is stored
        4. Select "Advanced Git Options"
        5. Context Dir: `/worker`
        6. Resource type to generate: Deployment
        7. Create a route to the application: No
    2. Fix the deployment
        1. As directed in the video demo, immediately update the build yaml file for a docker image.  This will cause OpenShift to redeploy the pod, and this will take some time as OpenShift uses the docker file in the `/worker` directory to create and deploy the image.

## Architecture

![Architecture diagram](architecture.png)

* A Python webapp which lets you vote between two options
* A Redis queue which collects new votes
* A Java worker which consumes votes and stores them in a Postgres database
* A Postgres database backed by a volume
* A Node.js webapp which shows the results of the voting in real time

### Note

The voting application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.  You can use incognito/privte browser tabs to register multiple votes.
