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
# create an .env file (copy the .env.example)
cp .env.example .env
# run the api
python manage.py runserver
```

## Components

## Diagram

### Search Index

### User Interface

### API
