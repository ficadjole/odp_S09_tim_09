import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { Recipe } from "../../models/recipe/Recipe";

export interface IReceptApiService {
  getAllRecipes(token: string): Promise<ReceptListaDto[]>;
  getRecipeById(token: string, idRecepta: number): Promise<Recipe>;
  addRecipe(
    token: string,
    idKorisnika: number,
    nazivR: string,
    sastojci: string,
    opis: string,
    saveti: string,
    slika_url: string,
    idKategorije: number[]
  ): Promise<Recipe>;
  deleteRecipe(
    token: string,
    idRecepta: number,
    idKategorije: number
  ): Promise<Recipe>;
  getAllRecipesUser(
    token: string,
    idKorisnika: number
  ): Promise<ReceptListaDto[]>;
}
