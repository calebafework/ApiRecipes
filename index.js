// Import Express.js
const express = require("express");
const recipes = require("./data.json");
const bodyParser = require("body-parser");
const fs = require("fs");

// This variable defines the port of your computer where the API will be available
const PORT = 3000
// This variable instantiate the Express.js library
const app = express()

// Indicate to Express.js that you're using an additional plugin to treat parameters
app.use(bodyParser.urlencoded({ extended: true }))

// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () => console.log(`API is running on: localhost:${PORT}.`))

// The code below creates a GET route with these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to execute
app.get('/',(request,response) => {
  // The string we want to display on http://localhost:3000
    response.send("FUCK YOU, YOU STUPID MOTHERFUCKER!")
})

  // ALL RECIPE NAMES
app.get('/recipes', (request, response) => {
    // The function will return your bookList in a JSON
    // Sample: { allBooks: ["Make Time: How to Focus on what Matters Every Day", "The Power Of Habit"]}
    console.log("All Recipes ", recipes.recipes)
    return response.json({ AllRecipes : recipes })
})


  // Individual RECIPE NAME as string param
app.get('/recipes/details/:name', (request, response) => {
    // The function will return your bookList in a JSON
    // Sample: { allBooks: ["Make Time: How to Focus on what Matters Every Day", "The Power Of Habit"]}
    let recipeArr = Object.values(recipes.recipes)
    for(let i = 0; i < recipeArr.length; i++){
        if(request.params.name === recipeArr[i]["name"]){
            let numSteps = recipeArr[i]["instructions"].length;
            let details = {"details": {ingredients:recipeArr[i]["ingredients"], "numSteps": numSteps} }
            return response.json(details)
        }
    }
    return response.json({})
})

// Replace the GET method by POST
// Reminder: POST in the API world is used to ADD a data
app.post('/recipes', bodyParser.json(),(request, response)=> {
    //Get the name parameter from the body
    const newRecipe = request.body
    //Check if the list includes the recipe names
    //if it does we return false 
    console.log("request", request)
    if(recipes.recipes.includes(newRecipe) || Object.keys(request.body).length === 0){
        return response.status(400).json({"error": "Recipe already exists"})        
    } else {
    //Otherwise, add the new recipe and return true    
        fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.recipes.push(request.body); //add some data
            json = JSON.stringify(obj, null, 4); //convert it back to json
            fs.writeFile('data.json', json, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("complete")
            }); // write it back 
        }});    

        return response.status(201).send();
    }
})

app.put('/recipes/:name', bodyParser.json(),(request, response)=> {
    //Get the name parameter from the body
    const newRecipe = request.body
    //Check if the list includes the recipe names
    //if it does we return false 
    console.log("request", request)
    if(recipes.recipes.includes(newRecipe) || Object.keys(request.body).length === 0){
        return response.status(400).json({"error": "Recipe already exists"})        
    } else {
    //Otherwise, add the new recipe and return true    
        fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.recipes.push(request.body); //add some data
            json = JSON.stringify(obj, null, 4); //convert it back to json
            fs.writeFile('data.json', json, 'utf8', function(err){
                if(err){
                    console.log(err);
                }
                console.log("complete")
            }); // write it back 
        }});    

        return response.status(201).send();
    }
})
