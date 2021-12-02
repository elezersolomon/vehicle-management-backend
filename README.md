# Vehicle Management Backend

## Getting Started

- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

### Installation

1.  Clone the repo
    ```
     git clone https://gitlab.com/hurricanesupport/team-playground/vehicle-management-backend.git
    ```
2.  Install NPM packages
    ```
     npm install
    ```

### Environments

1.  Create your .env file

- For local environments
  ```
   .env
  ```

2.  Add your environment variables in the files

    ```
      PORT
      SECRET
      ADMIN_USER_PASSWORD
      
    ```

## Running the code

- Running the code in a production environment
  ```
   npm run start
  ```
- Running code in a development environment
  ```
   npm run start:dev
  ```

## Create System User

- To create a system admin use the API below

  ```
   POST /api/user/system/adminuser
  ```

## Running tests

- How to run unit tests
  ```
   npm run test
  ```

## Built With

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://www.expressjs.com/)
- [pouchdb](https://pouchdb.com/)

## Contribution

1.  Clone the project
2.  Create your feature branch with git flow
3.  Commit your changes
4.  Push your feature branch
5.  Create merge requests
