# tibicenas-framework 
**My SCSS framework to CSS**

I Gonna explain here everything, but now i'm with some issues, be patient :)
Se compone de una serie de carpetas:

- `css` -> Aquí se generará el archivo `application.css` final que se usará.
- `js`  -> Ubicaremos todos los archivos js necesarios, libs, partials y el `application.js` final.
- `scss` -> Aquí es donde comienza nuestra organización SASS, la cual explicaremos a continuación con más detalle


## Estructura de carpetas y archivos dentro de SCSS

- **base** -> Contiene el reset y los diseños base de nuestros elementos; headings, links, img, figuras, tablas etc...

- **layouts** -> Contiene las capas más generales de nuestra web; el grid, header, footer, sections, sidebars y los del body y más superiores del site.)

- **modules** -> Contiene los estilos de los módulos creados; botones, 
notificaciones, social area, pestañas etc.., cada uno separado en un archivo para facilitar su búsqueda y ediciones futuras. **¡modularizar es la clave!**

- **utilities** -> La carpeta más importante, contiene todas las variables, mixins, placeholders, y funciones que hemos creado y que utilizaremos en todo nuestro framework.

- `application.scss` -> Es el archivo final, aquí importamos todos los partials, y posteriormente se compilará en el archivo `application.css` ubicado en la carpeta css.

### Vista del archivo `application.scss`
Aquí es importante el orden en el que lo importamos para que todo funcione correctamente.

1) Necesitamos nuestras utilities pues las demás las usarán.

2) Luego los elementos generales (que sufriran ciertas modificaciones para algunas layouts o módulos)



```scss

// $Utilities
// ================================================
@import "utilities/-index";


// $Base
// ================================================
@import "base/-index";


// $Layouts
// ================================================
@import "layouts/-index";


// $Modules
// ================================================
@import "modules/-index";


// $States
// ================================================
@import "states/-index";

```

## Los -index

Los archivos `_-index.scss` se encuentran en cada carpeta.

Su función es recopilar todos los partials que se encuentren dentro de esa carpeta;
  - Un partial es un archivo scss que no se va a compilar en css. 
  - Su código se crea para más adelante importarlo en un archivo que sí vaya a compilarse (en nuestro caso será el 'application.scss' que contiene los `@import` finales) 
  - los partials comienzan su nombre con una barra baja '_' ejemplo: `_grid.scss`

Por lo que los `_-index.scss` de cada carpeta contendrán todo el código de su carpeta padre que quieran llevar a producción, y estos `_-index.scss` los importaremos en nuestro 'application.scss'

Si vuelves a observar el código anterior, veras que tengo bien señalado a quién pertenece el index para facilitar la comprensión.



## Buscar cierto código entre todos los archivos sin tener que ir navegando entre todos ellos.

Como podrás ver, todos mis enunciados comienzan con un dolar sign y luego el nombre `$Ejemplo`

Por lo que si tuviesemos que buscar en nuestro código dónde está el código que da estilo a nuestro Super Botón, tan solo tendrías que utilizar la función de búsqueda de tu editor de código (normalmente tiene un Shortcut asignado para esto, ya que es algo muy usado) y entonces escribe el dolar '$' y ya de entrada tendrías todos los enunciados, luego si escribimos '$SUPER' pues nos cargaría el archivo correcto justo en la línea donde empieza el código del super botón.

```scss
/*------------------------------------*\
              $RESET
\*------------------------------------*/


html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

/*------------------------------------*\
              $SUPER BOTON
\*------------------------------------*/

// awesome scss goes here ;)
```

