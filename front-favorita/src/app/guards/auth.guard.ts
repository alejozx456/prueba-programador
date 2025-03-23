import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService)
  const router=inject(Router)
  //const http=inject(HttpClient)



  return authService.getSession().pipe(
    map((response: any) => {
      // Aquí puedes verificar los datos del usuario si es necesario
      console.log('Usuario autenticado:', response.user);
      return true; // Permitir acceso si el endpoint respondió correctamente
    }),
    catchError((error) => {
      console.error('Error al validar la sesión:', error);
      router.navigate(['/login']).then(() => {
        window.location.reload();
      }); // Redirigir al login si la sesión no es válida
      return of(false); // Bloquear acceso
    })
  );


};
