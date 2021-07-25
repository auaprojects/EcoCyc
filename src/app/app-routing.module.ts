import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'detail/:id',
    // path: 'detail',
    loadChildren: () => import('./request/detail/detail.module').then(m => m.DetailPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'new-request',
    loadChildren: () => import('./request/new-request/new-request.module').then(m => m.NewRequestPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'home-pro',
    loadChildren: () => import('./home-pro/home-pro.module').then(m => m.HomeProPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'conversation',
    loadChildren: () => import('./conversation/conversation.module').then(m => m.ConversationPageModule)
  },  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
