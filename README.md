# Lecture Search and Slide Segmentation

## Introduction

### Motivation

### Problem Statement

### Proposed Solution

## Architecture

### Diagram

```mermaid
C4Deployment
    title Component diagram for Lecture Search and Segmentation
    Deployment_Node(do, "Digital Ocean") {
        Deployment_Node(static_app, "Static") {
            Container(spa, "Single Page Application", "JavaScript and React " "Front end search application.")
        }
        Deployment_Node(dynamic_app, "Dynamic") {
            Container_Boundary(api, "Python and Django API", "") {
                Component(docs, "Documents Controller", "Controller", "Handles API requests for searching documents")
                Component(search_engine, "MetaPy Search Engine", "metapy", "Provides access to the inverted index to search for relevant documents")
                Rel(docs, search_engine, "Uses")
            }
        }
    }

    Rel_Back(spa, docs, "Uses", "JSON")
```

The Lecture Search Engine was created with the [metapy](https://github.com/meta-toolkit/metapy) NLP toolkit.

The Lecture Search Client was created with the [React](https://reactjs.org/) web application framework.

The Lecture Search API was created with the [Django](https://www.djangoproject.com/) web application framework.

The API and Client are automatically deployed to the Digital Ocean platform every time a commit
is pushed to the main branch.

The live Client can be accessed at the following URL:

https://stingray-app-3sdu7.ondigitalocean.app/

The live API can be accessed at the following URL:

https://sea-turtle-app-7y54u.ondigitalocean.app/documents/

The API only includes one endpoint: `/documents`. This endpoint accepts HTTP GET requests with a search query parameter. The search parameter is a space separated list of words. The endpoint responds with a json formatted list of search results.

Example:

```sh
(base) ➜  api git:(main) curl https://sea-turtle-app-7y54u.ondigitalocean.app/documents/\?search\=test
{"corpus": "CS410_lectures", "query": "test", "results": [{"03_video_id": "W03_L06", "04_title": "Evaluation Of Tr Systems Practical Issues", "01_doc_id": 17, "06_txt_path": "path/to/W03_L06.txt", "02_score": 14.651, "05_vid_path": "path/to/W03_L06.mp4", "00_rank": 1}, {"03_video_id": "W03_L01", "04_title": "Evaluation Of Tr Systems", "01_doc_id": 12, "06_txt_path": "path/to/W03_L01.txt", "02_score": 11.206, "05_vid_path": "path/to/W03_L01.mp4", "00_rank": 2}, {"03_video_id": "W11_L02", "04_title": "Text Categorization Evaluation Part 1", "01_doc_id": 81, "06_txt_path": "path/to/W11_L02.txt", "02_score": 7.386, "05_vid_path": "path/to/W11_L02.mp4", "00_rank": 3}, {"03_video_id": "W12_L04", "04_title": "Contextual Text Mining Mining Causal Topics With Time Series Supervision", "01_doc_id": 89, "06_txt_path": "path/to/W12_L04.txt", "02_score": 4.599, "05_vid_path": "path/to/W12_L04.mp4", "00_rank": 4}, {"03_video_id": "W10_L06", "04_title": "Text Clustering Evaluation", "01_doc_id": 77, "06_txt_path": "path/to/W10_L06.txt", "02_score": 4.599, "05_vid_path": "path/to/W10_L06.mp4", "00_rank": 5}]}
```

## Running the Application Locally

### Prerequisites
- nodejs 16+
- python 3.9+
- MacOS or Linux recommended

#### Client

```sh
cd code/client
# install the dependencies
yarn install
# run the application
yarn run
```

The Client is available at the following URL: https://localhost:3000


#### API

```sh
cd code/api
# create a conda environment
conda create --name lecture_search python=3.5.6
# activate it
conda activate lecture_search
# install the dependencies
pip install -r requirements.txt
# run the database migrations
python manage.py migrate
# run the tests
python manage.py test
# try searching from the command line
python lecture_search_cli.py
# run the api
gunicorn api.wsgi
```

The API is available the following URL: http://localhost:8000/documents

Try out a document search through the API: http://localhost:8000/documents?search=term%20frequency