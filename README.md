# Trashure API Guide

## Project Description

Trashure-backend is an API server designed for the Trashure application. Trashure is a application predictive analysis-based electronic waste management application for market value estimation of used electronics.

In the development process, we used a tech stack comprising Node.js with Express.js as the framework because it is flexible in use. Besides the built-in libraries in Express, we also utilized third-party libraries to facilitate the creation of the API server. Some of the third-party libraries we used include:

| Third-party Library  | Used for                                  |
| -------------------- | ----------------------------------------- |
| Prisma ORM           | Database management and querying          |
| Express-fileupload   | Handling file uploads                     |
| Joi                  | Data validation                           |
| JSON Web Token (JWT) | Authentication and authorization          |
| Bcrypt               | Password hashing                          |
| Jest                 | Testing framework                         |
| Google-cloud/storage | Storing and retrieving files in the cloud |
| Tensorflow JS        | Machine learning and predictive analysis  |
| Child process        | Executing subprocesses within the server  |
|                      |                                           |

We use the folder structure as below :

```php
src/
├── app/ // Contains configuration files and settings for the application.
│ ├── database.js // Manages database connections and queries.
│ ├── logging.js // Handles logging within the application.
│ └── web.js // Configures web server settings.
├── controller/ // handle HTTP requests and responses.
│ └── ...
├── error/ // files for error handling
│ └── ...
├── middleware/ // process requests before reach the controllers
│ └── ...
├── route/ // the routing files which define API endpoints.
│ └── ...
├── service/ // the service layer that handles business logic
│ └── ...
├── utils/ // utility functions and helper scripts
│ └── ...
└── validation/ // validation logic for various entities
└── ...
```

We use TensorFlow.js to get prediction results from the model developed by the Machine Learning Engineer. This allows the application to make price predictions using the trained model.

If you notice, there is a Python file in the `utils` folder. This file is used to standardize the data that TensorFlow.js will later need for predictions. This approach was implemented in accordance with the agreement made with the Machine Learning Engineer from the Trashure team. Therefore it is also necessary:

1. `python3`: Installs Python 3, the programming language.
2. `python3-pip`: Installs pip, the package installer for Python 3.
3. `python3-dev`: Installs header files and a static library for Python 3, which are often required for building Python packages that include C extensions.

We also need a Third-party library from python, namely :

| Third-party Library | Used for                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| scikit-learn        | machine learning library for Python that includes tools for classification, regression, clustering, and more |
| pandas              | providing data structures and data analysis tools for Python                                                 |
| numpy               | library for numerical computing in Python, providing support for large multi-dimensional arrays and matrice  |
|                     |                                                                                                              |

## Data Model & API Endpoints

You can see the Physical Data Model that will be implemented in the Trashure-backend in the image below:

![PDM Trashure!](/docs/assets/ERD.png "PDM Trashure")

We have created 14 API endpoints that will be created on this server. There are two roles, namely user and collector.

> Here our [Postman Documentation API ](https://documenter.getpostman.com/view/25561973/2sA3XLE44Z).

## Cloud Architecture

The API server will be deployed using Google Cloud Platform services, namely Cloud Run. We also use Cloud SQL (mysql) for the database and Cloud storage to store data in the form of objects such as photos. The image below is the Cloud Architecture that we have used :

![PDM Trashure!](/docs/assets/cloud-architecture.jpg "PDM Trashure")

# How to Install and Run the Project

This guide will walk you through the process of setting up and installing an API using Express.js.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

1. Node.js
2. npm (Node Package Manager)
3. Python
4. pip (Preferred Installer Program)
5. Google Cloud Platform (GCP) Account

## Getting Started

Follow the steps below to set up your API:

> If you run on your local computer without using GCP, create a database and set environment variables as in `.env.example`. Make sure all the prerequisites are installed, then run `npm run start`

1. **Create Cloud SQL**

   Before you set up the instances, you need to establish a connection to Cloud SQL:

   - Create and set up your Cloud SQL database.
   - add network `0.0.0.0/0` to give an access.
   - Open `/prisma/migrations/202406...` folder
   - Import the `migration.sql` file to define the table structure.
   - Copy your database name as DB_NAME, public ip as DB_HOST, password as DB_PASSWORD, 3306 as DB_HOST, and root as DB_USER. All put into DATABASE_URL

   ```js
   DATABASE_URL =
     "mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?connection_limit=5";
   ```

2. **Create Cloud Storage**

   Before you set up the instances, you need to establish a connection to Cloud SQL:

   - Create and set up your bucket.

   ```js
   BUCKET_NAME = "COPY YOUR BUCKET NAME HERE";
   ```

   - Open `/machine-learning` folder
   - Import the `.bin` and `model.json` file into Cloud Storage
   - Don't forget to give public access and IAM Access `Storage Object Users` for allUsers.
   - Copy your public url `model.json` Put the url in MODEL_URL.

   ```js
   MODEL_URL = "COPY YOUR MODEL.JSON PUBLIC URL HERE";
   ```

3. **Create Env in Secret Manager**

   Create an Environment Variable in the Secret Manager service to store passwords or other sensitive data such as

   ```js
   DATABASE_URL;
   JWT_SECRET_TOKEN;
   BUCKET_NAME;
   MODEL_URL;
   ```

   Give an IAM access to your service account as `Secret Manager Secret Accessor` so that when setting up cloud run, we can access the environment stored in the Secret Manager

4. **Clone the Repository in Google Cloud Platform**

   Start by cloning the repository:

   ```
   git clone https://github.com/Trashure-C241-PS226/trashure-backend.git
   ```

5. **Create a Dockerfile**

   Create a Dockerfile in the `trashure-backend` directory which will be used to create a container image as the first step to deploy using Cloud Run. Please follow this command in your cloud shell:

   ```
   cd trashure-backend/
   ```

   ```
   nano Dockerfile
   ```

   ```docker
   FROM node:buster-slim
   WORKDIR /app
   COPY . .

   # Memperbarui paket dan menginstal dependencies untuk Python dan Node.js

   RUN apt-get update && \
   apt-get install -y build-essential python3 python3-pip python3-dev && \
   pip3 install --upgrade pip && \
   pip3 install scikit-learn pandas numpy && \
   npm install

   EXPOSE 8080
   CMD ["npm","run","start"]
   ```

6. **Upload to Artifact Registry**

   - By using Cloud Build, we can create a new container image and it will be stored in the Artifact Registry. Make sure the Artifact Registry, Cloud Run, and Cloud Build APIs are Active. Run this command in Cloud Shell:

   ```
   gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com
   ```

   - Before that, we create an Artifact Registry repository with the name "Backend"

   ```
   gcloud artifacts repositories create backend --repository-format=docker --location=asia-southeast2 --async
   ```

   - After the repository has been successfully created, then create a new Container Image with the name "trashure-api"

   ```
   gcloud builds submit --tag asia-southeast2-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/backend/trashure-api:1.0.0
   ```

   - The container image has been successfully saved in the Artifact Registry.

7. **Deploy in Cloud Run**

   - Open Cloud Run in console.
   - `CREATE SERVICE`.
   - Select your Container Image from Artifact Registry that you just made.
   - in Authentication, check `Allow unathenticated invocations`.
   - Click Container(s), Volumes, Networking, Security then choose Container(s).
   - in Variables & Secrets, set up your environment on `Secrets exposed as environment variables`.
   - Choose your Secret Manager and give the environment .variable the same name as point number 3.
   - Create Service.
   - Wait until the process is complete and the URL link is ready to be used to access API Endpoints.

# Contributors

1. Muhammad Razzaaq Zulkahfi - https://www.linkedin.com/in/muhammad-razzaaq-zulkahfi-777766229/
2. Ahmad Fathoni - https://www.linkedin.com/in/ahmad-fathoni-094669250/
