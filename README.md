# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://start.4geeksacademy.com/starters/react-flask
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to heroku [in just a few steps here](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

You might need to install JWT for backend `$ pip install flask-jwt-extended`

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://start.4geeksacademy.com/deploy).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).



# Productivity Tracker

The productivity tracker will be used during internet browsing sessions to track and record time spent using the browser overall as well as on specific websites. The aim of this application is to increase the users awareness to the amount of time spent using the web browser in total and on which websites the user is spending most time. Thus, helping the user make more informed decisions on time spent and to help them concentrate on the most productive websites. 


# Technologies 

## Front-end 

The productivity tracker will use a website (single page application) as the front-end user interface built with HTML, CSS, JavaScript and React. It will have a user login system based on a JSON Web Tokens that will be required to use the application as well as viewing or editing any personal data. 

## Back-end 

The productivity tracker will store collected information in a backend system created with Python and the data will be accessible through a protected API. 

## Tracker (Chrome Extension) 

The productivity tracker itself that is used to track the users time spent on the browser and specific websites will be a Chrome Extension built using HTML, CSS and JavaScript. 

# APIs 

The productivity tracker will have its own API to store users information and the times related to browsing. This will be protected however may be used when working out statistics such as average time browsing per session. 

Cloudinary API -  Will be used to store users profile images. 

Google Maps API – Will be used to see browsing locations stored in users protected data. This can then be used to show the most productive locations. For example, browsing at home vs at the library.

# Using Back-end API

The current back-end URLs:

* BaseURL... /api/token
  * POST - returns a valid JWT when correct login credentials are sent. Body should follow the below format:  
  {  
  "email" : "user@email.com",  
  "password" : "1234"  
  }  

* BaseURL... /api/signup
  * POST - Add a new user. Body should follow below format:  
  {  
  "name" : "Fname Lname",  
  "email" : "test343@test343.com",  
  "password" : "1234"    
  }  

The following URLs are protected and need a valid JWT in the authentication header to access.
Example of how fetch might look with authorization:  
fetch(URL + "/api/sessions", {  
				method: "GET",  
				headers: {"Authorization": "Bearer " + token}  
			})  
			.then((recieved) => recieved.json())  
			.then((data) => {  
				return data  
			})  
			.catch((error) => console.log(error)  

* BaseURL... /api/users
  * GET - Shows all users
  * PUT - Updates an existing users data. Body should follow below format:  
  (Note that both "name" and "email" are optional here.)  
  {  
  "id" : 1,  
  "name" : "newName",  
  "email" : "newEmail"  
  } 

  * DELETE - Remove a user **and all related sessions**. Body should follow below format:  
  {  
  "id" : 1  
  }  

* BaseURL... /api/sessions
  * GET - Shows all sessions
  * POST - Add a new session. Body should follow below format:  
  {  
  "current_user_id" : 3,  
  "total_time" : 1000,  
  "work_time" : 600,  
  "fun_time" : 400  
  }  
  * DELETE - Currently deletes all sessions for a specific user. Body should follow below format:  
  {  
  "user_id" : 1  
  }  
