import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'oficinas', loadChildren: './oficinas/oficinas.module#OficinasPageModule' },
  { path: 'more-view', loadChildren: './more-view/more-view.module#MoreViewPageModule' },
  { path: 'assinados', loadChildren: './assinados/assinados.module#AssinadosPageModule' },
  { path: 'juri', loadChildren: './juri/juri.module#JuriPageModule' },
  { path: 'comentarios/:id', loadChildren: './comentarios/comentarios.module#ComentariosPageModule' },
  { path: 'program', loadChildren: './program/program.module#ProgramPageModule' },
  { path: 'masterclass', loadChildren: './masterclass/masterclass.module#MasterclassPageModule' },
  { path: 'meus-votos', loadChildren: './meus-votos/meus-votos.module#MeusVotosPageModule' },
  { path: 'filmes', loadChildren: './filmes/filmes.module#FilmesPageModule' },
  { path: 'mostra-comp', loadChildren: './mostra-comp/mostra-comp.module#MostraCompPageModule' },
  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
