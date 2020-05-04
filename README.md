# aloe-there, plant swap & resource community
This is an Express app with local user authentication designed for users to create a community to share events, plant care tips and trade seeds, clippings or plants of their choosing. Currently users can reference the plantopedia and save the plants they hope to acquire and post events in their area. 

In the future, we hope to add a plant trading functionality to do some match-making to help users acquire future plant babies 

## Built with
* Express
* Passport and passport-local
* PostgresSQL and Sequlize
* EJS layouts
* Materialize styling
* Google Maps API for address autocompletion

## Included Models

**User Model** 

|Column| Type | Notes |
|-----------------|------------|-------------|
| id | Integer | Serial primary Key|
| firstname | String | Required length > 1 |
| lastname | String | - |
| email | String | Unique Login |
| password | String | Hash |
| username | String | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| street_number | String | - |
| route | String | - |
| city | String | - |
| state| String | - |
| zipcode | String | - |
| country | String | - |
| createdAt | Date | Automatically added by Sequelize |
| updatedAt | Date | Automatically added by Sequelize |

**Plant Model** 
|Column| Type | Notes |
|-----------------|------------|-------------|
| id | Integer | Serial primary Key|
| commonName | String | - |
| sciName | String | - |
| category | String | - |
| link | String | - |
| pic | String | - |
| description | Text | - |
| location | String | - |
| care | Text | - |

**Wishlist Model**
|Column| Type | Notes |
|-----------------|------------|-------------|
| id | Integer | Serial primary Key|
| userId | Integer | Foreign key |
| plantId | Integer | Foreign key |

**Event Model**
|Column| Type | Notes |
|-----------------|------------|-------------|
| id | Integer | Serial primary Key|
| title | String | - |
| date | Date | - |
| startTime | Time | - |
| endTime | Time | - |
| location | String | - |
| content | Text | - |
| userId | Integer | - |


## Included Routes

| Method │ Path │
|------------|--------------------|
│ GET │ `/auth/login` │
│ POST │ `/auth/login` │
│ GET │ `/auth/signup` │
│ POST │ `/auth/signup` │
│ GET │ `/auth/logout` │
│ GET │ `/profile/user` │
│ GET │ `/profile/guest/:id` │
│ GET | `/profile/admin` │
│ POST │ `/profile/user` │
│ DELETE │ `/profile/user/:id` │
│ GET │ `/plantopedia `│
│ GET │ `/plantopedia/:id` │
│ GET │ `/community/events` │
│ GET │ `/community/events/create` │
│ POST │ `/community/events` │
│ GET │ `/community/events/:id/edit` │
│ PUT │ `/community/events/:id` │
│ DELETE │ `/community/events/:id` │
│ GET │ `/community/trade` │
│ GET │ `/` │
│ GET │ `*` |


## Directions for use

### 1. Fork & clone the repository. 
```sh
git clone https://github.com/essleeung/aloe-there.git <new_name>
```

### 2. Install the modules from package.json
```sh
npm i
```
### 3. Sign up for new Google api key and update the .env file
```sh
GMAP_API= <your_API_key>
```

### 4. Create a new database to store your data.
```sh
createdb <new_db_name>
```

### 5. Run the sequelize migrations

```sh
sequelize db:migrate]
```

### 6. Run the data scraping files (order matters) to grab plantopedia data.  
```sh
node plantsScraper.js
node onePlantScrape.js
``` 

### 7. Run server and check that everything is a-okay. Runs on port 3000.

```sh
nodemon
``` 

## Plant data
Data was acquired from [here](interiorplants.ca).