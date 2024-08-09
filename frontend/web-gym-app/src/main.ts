import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { authInterceptor, AuthInterceptor } from './app/auth-interceptor';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
})
  .catch((err) => console.error(err));
