import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// No es necesario importar AppComponent aquí si es standalone
import { AppComponent } from './app.component'; 

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // AppComponent no se incluye aquí
  ],
  bootstrap: [AppComponent] // Esto está correcto
})
export class AppModule { }