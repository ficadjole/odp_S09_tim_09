import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { Recipe } from "../../models/recipe/Recipe";
import type { IReceptApiService } from "./IReceptApiService";
import axios from "axios";

//const API_URL: string = import.meta.env.VITE_API_URL + "recepti";
const API_URL = "http://localhost:4000/api/v1/recepti";
const emptyRecipe: Recipe = {
  idRecepta: 0,
  nazivR: "",
  sastojic: "",
  opis: "",
  saveti: "",
  slika_url: "",
  date: new Date(),
  kategorije: [],
  author: {
    idKorisnika: 0,
    username: "",
  },
};

export const recipesApi: IReceptApiService = {
  async getAllRecipes(token: string): Promise<ReceptListaDto[]> {
    try {
      const res = await axios.get<ReceptListaDto[]>(
        `${API_URL}/prikaziSveRecepte`
        /*         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } */
      );

      return res.data.data;
    } catch (error) {
      console.log("Greska front: ", error);
      return [];
    }
  },
  async getRecipeById(token: string, idRecepta: number): Promise<Recipe> {
    try {
      const res = await axios.get<Recipe>(
        `${API_URL}/${encodeURIComponent(idRecepta)}`
        /*         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } */
      );

      return res.data.data;
    } catch {
      return emptyRecipe;
    }
  },
  async addRecipe(
    token: string,
    idKorisnika: number,
    nazivR: string,
    sastojci: string,
    opis: string,
    saveti: string,
    slika_url: string,
    idKategorije: number[]
  ): Promise<Recipe> {
    try {
      const res = await axios.post<Recipe>(
        `${API_URL}/dodajRecept`,
        {
          idKorisnika,
          nazivR,
          sastojci,
          opis,
          saveti,
          slika_url,
          idKategorije,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch {
      return emptyRecipe;
    }
  },
  async deleteRecipe(
    token: string,
    idRecepta: number,
    idKategorije: number
  ): Promise<Recipe> {
    try {
      const res = await axios.delete(`${API_URL}/obrisiRecept`, {
        data: {
          idRecepta,
          idKategorije,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch {
      return emptyRecipe;
    }
  },
  async getAllRecipesUser(
    token: string,
    idKorisnika: number
  ): Promise<ReceptListaDto[]> {
    try {
      const res = await axios.get<ReceptListaDto[]>(
        `${API_URL}/korisnikovi/${encodeURIComponent(idKorisnika)}`
        /*         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } */
      );

      return res.data.data;
    } catch (error) {
      console.log("Greska front: ", error);
      return [];
    }
  },
};
