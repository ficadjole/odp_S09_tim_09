import { BlogPostDto } from "../../Domain/DTOs/blogPost/BlogPostDto";
import { KategorijaDto } from "../../Domain/DTOs/kategorija/KategorijaDto";
import { ReceptiListaDto } from "../../Domain/DTOs/recepti/ReceptListaDto";
import { BlogPost } from "../../Domain/models/BlogPost";
import { BlogPreporucenRecept } from "../../Domain/models/BlogPreporucenRecept";
import { Recept } from "../../Domain/models/Recept";
import { IBlogPreporucenReceptRepository } from "../../Domain/repositories/IBlogPreporucenReceptRepository";
import { IBlogRepository } from "../../Domain/repositories/IBlogRepository";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IReceptKategorijaRepository } from "../../Domain/repositories/IReceptKategorijaRepository";
import { IReceptRepository } from "../../Domain/repositories/IReceptRepository";
import { IBlogService } from "../../Domain/services/IBlogService";

export class BlogService implements IBlogService {
  public constructor(
    private blogRepository: IBlogRepository,
    private korisnikRepository: IKorisnikRepository,
    private blogPreporucenReceptRepository: IBlogPreporucenReceptRepository,
    private receptRepository: IReceptRepository,
    private kategorijaRepository: IKategorijaRepository,
    private receptKategorijaRepository: IReceptKategorijaRepository
  ) {}
  async dodajBlogPost(
    idModeratora: number,
    naslovB: string,
    sadrzaj: string,
    idPreporucenRecept: number[]
  ): Promise<BlogPostDto> {
    const postojeciBlogPost = await this.blogRepository.getByNaslovB(naslovB);

    if (postojeciBlogPost.idBlogPost !== 0) return new BlogPostDto();

    const noviBlogPost = await this.blogRepository.dodajBlogPost(
      new BlogPost(0, idModeratora, naslovB, sadrzaj, new Date())
    );

    //provera da li postoje recepti
    for (var i = 0; i < idPreporucenRecept.length; i++) {
      const postojeciRecept = await this.receptRepository.getByIdRecepta(
        idPreporucenRecept[i]
      );
      if (postojeciRecept.idRecepta !== 0) {
        continue;
      } else {
        return new BlogPostDto();
      }
    }

    //dodavanje recept za blog post

    for (var i = 0; i < idPreporucenRecept.length; i++) {
      const noviPreporucenRecept =
        await this.blogPreporucenReceptRepository.dodajBlogPreporucenRecept(
          new BlogPreporucenRecept(
            noviBlogPost.idBlogPost,
            idPreporucenRecept[i]
          )
        );
      if (
        noviPreporucenRecept.idBlogPost !== 0 &&
        noviPreporucenRecept.idRecepta !== 0
      ) {
        continue;
      } else {
        return new BlogPostDto();
      }
    }

    if (noviBlogPost.idBlogPost !== 0) {
      return this.mapToDTO(noviBlogPost);
    } else {
      return new BlogPostDto();
    }
  }

  async obrisiBlogPost(
    idBlogPost: number,
    idRecepta: number[]
  ): Promise<BlogPostDto> {
    //birsemo recept
    const postojeciBlogPost = await this.blogRepository.getByidBlogPost(
      idBlogPost
    );

    if (postojeciBlogPost.idBlogPost === 0) return new BlogPostDto();

    const obrisanBlogPost = await this.blogRepository.obrisiBlogPost(
      postojeciBlogPost.idBlogPost
    );

    //brisemo podatke iz recept_kategorija

    for (var i = 0; i < idRecepta.length; i++) {
      const postojeciBlogPreporucen =
        await this.blogPreporucenReceptRepository.getById(
          postojeciBlogPost.idBlogPost,
          idRecepta[i]
        );

      if (postojeciBlogPreporucen.idBlogPost !== 0) {
        const obrisanReceptKategorija =
          await this.blogPreporucenReceptRepository.obrisiBlogPreporucenRecept(
            postojeciBlogPost.idBlogPost,
            idRecepta[i]
          );

        if (obrisanReceptKategorija == true) {
          continue;
        } else {
          return new BlogPostDto();
        }
      } else {
        return new BlogPostDto();
      }
    }

    if (obrisanBlogPost == true) {
      return this.mapToDTO(postojeciBlogPost);
    } else {
      return new BlogPostDto();
    }
  }

  async prikaziSveBlogPost(): Promise<BlogPostDto[]> {
    const blogPostovi: BlogPost[] = await this.blogRepository.getAllBlogPost();

    const blogPostoviListaDto: BlogPostDto[] = [];

    for (var i = 0; i < blogPostovi.length; i++) {
      blogPostoviListaDto.push(await this.mapToDTO(blogPostovi[i]));
    }

    return blogPostoviListaDto;
  }

  async getByIdBlogPost(idBlogPost: number): Promise<BlogPostDto> {
    const trazeniBlogPost: BlogPost = await this.blogRepository.getByidBlogPost(
      idBlogPost
    );

    if (trazeniBlogPost.idBlogPost === 0) {
      return new BlogPostDto();
    }

    return this.mapToDTO(trazeniBlogPost);
  }

  private async mapToDTO(blogPost: BlogPost): Promise<BlogPostDto> {
    const blogRecept =
      await this.blogPreporucenReceptRepository.getAllPreporuceneZaPost(
        blogPost.idBlogPost
      );

    const recepti: ReceptiListaDto[] = [];

    for (var i = 0; i < blogRecept.length; i++) {
      if (blogRecept[i].idRecepta) {
        const recept = await this.receptRepository.getByIdRecepta(
          blogRecept[i].idRecepta
        );

        const kategorije = await this.kategorijeLista(recept);

        if (recept.idRecepta !== 0) {
          recepti.push(
            new ReceptiListaDto(
              recept.idRecepta,
              recept.nazivR,
              recept.slika_url,
              kategorije
            )
          );
        }
      }
    }

    const autor = await this.korisnikRepository.getById(blogPost.idModerator);

    return new BlogPostDto(
      blogPost.idBlogPost,
      blogPost.naslovB,
      blogPost.sadrzaj,
      blogPost.datum,
      recepti,
      { idKorisnika: autor.idKorisnika, username: autor.username }
    );
  }

  private async kategorijeLista(recept: Recept): Promise<KategorijaDto[]> {
    const receptKategorija =
      await this.receptKategorijaRepository.sveKategorijeRecepta(
        recept.idRecepta
      );
    const kategorije: KategorijaDto[] = [];
    for (var i = 0; i < receptKategorija.length; i++) {
      if (receptKategorija[i].idKategorije) {
        const kategorija = await this.kategorijaRepository.getByIdKategorije(
          receptKategorija[i].idKategorije
        );

        if (kategorija.idKategorije !== 0) {
          kategorije.push(
            new KategorijaDto(kategorija.idKategorije, kategorija.nazivK)
          );
        }
      }
    }
    return kategorije;
  }
}
