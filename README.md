# Ivan Tech Coach - Landing Page

Landing page profesional y moderna para Ivan Tech Coach, desarrollada con Next.js 14, TypeScript y Tailwind CSS. La aplicación ofrece una experiencia multiidioma (español e inglés) con diseño responsivo y optimizado para SEO.

## 🚀 Características

- **Multiidioma**: Soporte completo para español e inglés con routing automático
- **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- **Responsive**: Diseño adaptativo que funciona perfectamente en todos los dispositivos
- **SEO Optimizado**: Meta tags, sitemap y robots.txt configurados
- **Performance**: Optimización de imágenes (WebP/AVIF) y carga rápida
- **Componentes Modulares**: Arquitectura basada en componentes reutilizables
- **Canvas Interactivo**: Animación de ondas en el hero section
- **Formulario de Contacto**: Sistema de contacto integrado

## 🛠️ Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Estilos utilitarios y diseño responsivo
- **Lucide React**: Iconos modernos y ligeros
- **React 18**: Biblioteca UI con las últimas características

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ivantechcoach-landing-2.0.git
cd ivantechcoach-landing-2.0
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en modo desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción (requiere build previo)
- `npm run lint`: Ejecuta el linter para verificar el código

## 📁 Estructura del Proyecto

```
ivantechcoach-landing-2.0/
├── app/                    # App Router de Next.js
│   ├── [lang]/            # Rutas dinámicas por idioma
│   │   ├── contact/       # Página de contacto
│   │   └── page.tsx       # Página principal
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Redirección inicial
│   ├── globals.css        # Estilos globales
│   ├── robots.ts          # Configuración robots.txt
│   └── sitemap.ts         # Generación de sitemap
├── components/            # Componentes React
│   ├── About.tsx          # Sección sobre mí
│   ├── Contact.tsx        # Componente de contacto
│   ├── ContactForm.tsx    # Formulario de contacto
│   ├── CTA.tsx            # Call to action
│   ├── FAQ.tsx            # Preguntas frecuentes
│   ├── Footer.tsx         # Pie de página
│   ├── Header.tsx         # Encabezado y navegación
│   ├── Hero.tsx           # Sección hero
│   ├── LangUpdater.tsx    # Selector de idioma
│   ├── Services.tsx       # Sección de servicios
│   └── WaveCanvas.tsx    # Canvas de ondas animadas
├── content/               # Contenido multiidioma
│   ├── es.json           # Contenido en español
│   └── en.json           # Contenido en inglés
├── lib/                   # Utilidades
│   └── content.ts        # Función para cargar contenido
├── public/                # Archivos estáticos
│   └── images/           # Imágenes y assets
├── middleware.ts          # Middleware para routing de idiomas
└── package.json          # Dependencias y scripts
```

## 🌐 Idiomas

El proyecto soporta dos idiomas:
- **Español** (`/es`): Idioma por defecto
- **Inglés** (`/en`)

El middleware redirige automáticamente a `/es` si no se especifica un idioma en la URL.

## 🎨 Personalización

### Contenido

El contenido se gestiona a través de archivos JSON en la carpeta `content/`:
- `content/es.json`: Contenido en español
- `content/en.json`: Contenido en inglés

### Estilos

Los estilos se gestionan con Tailwind CSS. La configuración se encuentra en `tailwind.config.ts`.

### Imágenes

Las imágenes se almacenan en `public/images/` y se optimizan automáticamente por Next.js.

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

### Otros Proveedores

```bash
npm run build
npm run start
```

## 📝 Licencia

Este proyecto es privado y propiedad de Ivan Tech Coach.

## 👤 Autor

**Ivan Tech Coach**

---

Desarrollado con ❤️ usando Next.js y TypeScript

