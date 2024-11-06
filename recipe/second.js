
let heading = document.querySelector(".searchr")
// fethcing recipe using mealdb api
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


async function getName(strMeal) {
    heading.innerHTML="<h2>Fetching </h2>"
    try {
        let response = await fetch(url + strMeal);
        let data = await response.json();
        
        console.log(data);
        return data.meals;
    } catch (e) {
        console.log("error: ", e);
        return [];
        
    }
}


// search button 

let btn = document.querySelector("#btn");
let hide1 = document.querySelector(".hide-1");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    
    let search = document.querySelector("input").value.trim();
    let strMeal = `${search}`;
    console.log(strMeal);
    
    let mealArr = await getName(strMeal);
    if (search === "") {
        alert("Please type something in Search box..");
    } else if (mealArr == null) {
        alert("Recipee not found");
    }    
    
    else {
        console.log(mealArr);
        heading.innerHTML=""
        display(mealArr);
    }    

    hide1.classList.remove("hide-1");
});    





//function for displaying the array of items 
function display(mealArr) {
    let list = document.querySelector("#items");
    let cardBox = document.getElementById("card");
    let removebtn = document.querySelector("#close");
    let hide2 = document.querySelector(".hide-2");


    //creating the loop for displaying the array of recipe one by one using api keys and objects
    for (meal of mealArr) {
        //creating the cards of all recipes
        let recipe = document.createElement("div");
        recipe.classList.add("recipe-details");
        recipe.innerHTML = `
       <img src="${meal.strMealThumb}"> 
       <h2>${meal.strMeal}</h2>
      `; 



        //creating button into the cards of all recipe
        let btnRecipe = document.createElement("button");
        btnRecipe.innerText = "View Recipe";
        recipe.appendChild(btnRecipe);
        cardBox.appendChild(recipe);

        const Ingredients = (meal) => {

            let inglist = ""
        
            for (let i = 1; i <= 20; i++) {
        
                const Ingredient = meal[`strIngredient${i}`]
                if (Ingredient) {
                    const measurement = meal[`strMeasure${i}`]
                    inglist += `<li>${measurement} ${Ingredient}</li>`
                    // console.log(inglist)
                    
                    
                }    
                else {
                    break;
                }    
        
                
                
                
            }    
            return inglist;
        
        }    
        




        //apperaing the sidebox and its content(name ,instruction)
        let inst = document.createElement("li");
        let name = document.createElement("h2");
        let instructions = document.createElement('h3')
        let ing = document.createElement('ul')
        ing.classList.add('ingredient')
        ing.innerHTML = `
        
        <h1>Ingredients..</h1>
        <ul>${Ingredients(meal)}</ul>
   
        `







        inst.innerText = meal.strInstructions;
        instructions.innerText = "Instructions"
        name.innerText = meal.strMeal;
        // `ing.${Ingredients(meal)}`


        btnRecipe.addEventListener("click", async () => {

            hide2.classList.remove("hide-2");
            list.appendChild(name);
            list.appendChild(ing)
            list.appendChild(instructions)
            list.appendChild(inst);

            console.log("yeah");

        });    





        //removing the sidebox and its content
        removebtn.addEventListener("click", () => {
            hide2.classList.add("hide-2");
            let list = document.querySelector("#items");
            if (list.children.length > 0) {
                list.removeChild(list.firstChild);
            }    
        });    
    }    
}    





