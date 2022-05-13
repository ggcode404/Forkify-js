// Global app controller




import Recipe from "./models/recipe";
import Search from "./models/search";
import { clearLoader, elements, renderLoader } from "./view/base";
import * as searchView from "./view/searchView";


const state = {};
window.state = state;



const controlSearch = async () => {

    const query =  searchView.getInput();

    if(query){
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchResList);

        state.search = new Search(query);
        await state.search.getResults()
        
        clearLoader();

        searchView.renderResult(state.search.result);
 
    }

    
    
}



elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    controlSearch();

})


// Recipe 

const controlRecipe = async () => {
    const id = window.location.hash.replace("#", '');

    if(id){
        state.recipe = new Recipe(id);

        await state.recipe.getRecipe();
    }
}


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');


    if(btn){
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage)
    }

});


window.addEventListener('hashchange', () => {
    controlRecipe();
});