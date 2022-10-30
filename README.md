# Lecture Search and Slide Segmentation

## Introduction

### Motivation

### Problem Statement

### Proposed Solution

## Running the Application

### Prerequisites
- nodejs 16+
- python 3.9+
- MacOS or Linux recommended

#### Client

```sh
cd client
# install the dependencies
yarn install
# run the application
yarn run
```

#### API

```sh
cd code/api
# create a conda environment
conda create --name lecture_search python=3.9.12
# activate it
conda activate lecture_search
# install the dependencies
pip install -r requirements.txt
# run the database migrations
python manage.py migrate
# build the search index
python search_index/build.py
# run the api
python manage.py runserver
```

The API is served under the following URL: https://localhost:8080/documents

## Components

## Diagram

### Search Index

### User Interface

### API
The Lecture Search API was created with the Django web application framework. More info to come soon!

#### Deployment
The API is automatically deployed to the Digital Ocean platform every time a commit
is pushed to the main branch under the `api` directory.

The live API can be accessed at the following URL:

https://sea-turtle-app-7y54u.ondigitalocean.app/documents/
