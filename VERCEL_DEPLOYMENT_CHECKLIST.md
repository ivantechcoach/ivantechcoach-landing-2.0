# ✅ Checklist de Despliegue a Vercel

## 📋 Pre-despliegue

### 1. Verificación de Código
- [x] ✅ Formulario de contacto funcionando localmente
- [x] ✅ Variables de entorno configuradas en `.env.local`
- [x] ✅ Console.error del cliente condicionado para desarrollo solamente
- [x] ✅ Enlaces de redes sociales actualizados y verificados
- [x] ✅ Contenido multiidioma completo (es/en)
- [x] ✅ Sitemap y robots.txt configurados

### 2. Build Local
```bash
pnpm run build
```
- [ ] Verificar que el build se complete sin errores
- [ ] Revisar warnings (si los hay)
- [ ] Verificar que no haya errores de TypeScript

### 3. Pruebas Locales
- [x] ✅ Formulario de contacto envía emails correctamente
- [ ] Probar todas las páginas: `/es`, `/en`, `/es/about`, `/en/about`, `/es/services`, `/en/services`, `/es/contact`, `/en/contact`
- [ ] Verificar que las animaciones funcionen correctamente
- [ ] Probar en diferentes tamaños de pantalla (responsive)
- [ ] Verificar que los enlaces de redes sociales abran correctamente

## 🚀 Configuración en Vercel

### 1. Variables de Entorno
Configurar en Vercel Dashboard → Settings → Environment Variables:

```
SMTP_HOST=smtp.buzondecorreo.com
SMTP_PORT=465
SMTP_USER=contact@ivantechcoach.com
SMTP_PASSWORD=[tu_contraseña_real]
CONTACT_EMAIL=contact@ivantechcoach.com
```

**⚠️ IMPORTANTE:** 
- Configurar estas variables para **Production**, **Preview**, y **Development**
- La contraseña debe ser la real, no un placeholder

### 2. Configuración del Proyecto
- [ ] Framework Preset: **Next.js**
- [ ] Build Command: `pnpm run build` (o dejar por defecto)
- [ ] Output Directory: `.next` (por defecto)
- [ ] Install Command: `pnpm install` (o dejar por defecto)
- [ ] Node.js Version: **18.x** o superior

### 3. Dominio Personalizado (Opcional)
Si tienes un dominio personalizado:
- [ ] Agregar dominio en Vercel Dashboard → Settings → Domains
- [ ] Configurar DNS según las instrucciones de Vercel
- [ ] Verificar certificado SSL (automático en Vercel)

## 📝 Post-despliegue

### 1. Verificaciones Inmediatas
- [ ] El sitio carga correctamente
- [ ] Todas las rutas funcionan (`/es`, `/en`, `/about`, `/services`, `/contact`)
- [ ] El formulario de contacto funciona y envía emails
- [ ] Los enlaces de redes sociales funcionan
- [ ] Las animaciones y efectos visuales se muestran correctamente
- [ ] El sitio es responsive en móvil, tablet y desktop

### 2. SEO y Performance
- [ ] Verificar que el sitemap esté accesible: `https://tu-dominio.com/sitemap.xml`
- [ ] Verificar robots.txt: `https://tu-dominio.com/robots.txt`
- [ ] Probar con Google PageSpeed Insights
- [ ] Verificar meta tags con herramientas SEO

### 3. Funcionalidades Críticas
- [ ] Formulario de contacto envía emails correctamente
- [ ] Redirección de idioma funciona (middleware)
- [ ] Todas las imágenes se cargan correctamente
- [ ] Los temas claro/oscuro funcionan (si aplica)

## 🔧 Troubleshooting Común

### Problema: Build falla en Vercel
**Solución:**
- Verificar que todas las dependencias estén en `package.json`
- Asegurarse de que `pnpm-lock.yaml` esté en el repositorio
- Revisar logs de build en Vercel Dashboard

### Problema: Formulario no envía emails
**Solución:**
- Verificar que todas las variables de entorno estén configuradas en Vercel
- Verificar que `SMTP_PASSWORD` no tenga espacios extra
- Revisar logs de función serverless en Vercel Dashboard → Functions

### Problema: Rutas no funcionan
**Solución:**
- Verificar que `middleware.ts` esté en la raíz del proyecto
- Verificar configuración de rewrites en `next.config.mjs` (si aplica)

### Problema: Estilos no se aplican
**Solución:**
- Verificar que `tailwind.config.ts` esté configurado correctamente
- Asegurarse de que `globals.css` esté importado en `layout.tsx`

## 📊 Monitoreo Post-despliegue

### Primera Semana
- [ ] Monitorear logs de errores en Vercel Dashboard
- [ ] Verificar que los emails del formulario lleguen correctamente
- [ ] Revisar analytics (si configurado)
- [ ] Probar formulario desde diferentes dispositivos

### Mantenimiento Continuo
- [ ] Actualizar dependencias periódicamente (`pnpm update`)
- [ ] Revisar logs de errores semanalmente
- [ ] Hacer backup de variables de entorno

## ✅ Lista Final Pre-despliegue

Antes de hacer el despliegue final, asegúrate de:

1. [ ] Build local exitoso (`pnpm run build`)
2. [ ] Todas las variables de entorno documentadas en `.env.example`
3. [ ] Variables de entorno configuradas en Vercel
4. [ ] Código limpio (sin console.logs innecesarios en producción)
5. [ ] Todos los enlaces verificados
6. [ ] Contenido revisado y sin errores tipográficos
7. [ ] Imágenes optimizadas
8. [ ] README actualizado con instrucciones de despliegue

## 🎯 Comandos Útiles

```bash
# Build local para verificar
pnpm run build

# Iniciar producción localmente (después de build)
pnpm run start

# Linting
pnpm run lint

# Type checking
pnpm run typecheck

# QA completo
pnpm run qa
```

---

**Última actualización:** $(date)
**Estado:** Listo para despliegue ✅
