## Run this App

Clone Repo
```
$ git clone https://github.com/codebudy5247/Stock-Price-Tracker-Assignment.git
```

### Run Backend
```
$ cd backend
$ npm install
$ npm run dev

//Destroy Data
$ npm run data:destroy

//Populate Database
$ npm run data:import

# Server started on 1337 PORT
```

### Run Frontend
```
$ cd frontend
$ npm install
$ npm run dev

App Started on http://localhost:5173/
```

### API endpoints

Base URL: http://localhost:1337

| APIs | VERB | Parameters | Description |
| --- | --- | --- | --- |
| /api/stock | GET | none | Get all stocks. |
| /api/stock/:stockSymbol | GET | stockSymbol | Get single stock data |