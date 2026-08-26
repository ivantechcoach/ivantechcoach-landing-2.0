import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
              Nos ayudan a mejorar tu experiencia de navegación y a entender cómo utilizas nuestro sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Tipos de Cookies que Utilizamos</h2>
            
            <h3 className="text-xl font-medium mb-3 mt-6">Cookies Esenciales</h3>
            <p className="text-muted-foreground mb-4">
              Necesarias para el funcionamiento básico del sitio web, como mantener tu sesión activa y preferencias de idioma.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-6">Cookies Analíticas</h3>
            <p className="text-muted-foreground mb-4">
              Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio mediante la recopilación y el análisis de información de forma anónima.
            </p>

            <h3 className="text-xl font-medium mb-3 mt-6">Cookies de Marketing</h3>
            <p className="text-muted-foreground mb-4">
              Se utilizan para rastrear a los visitantes en los sitios web y mostrar anuncios relevantes y atractivos para el usuario individual.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Gestión de Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y 
              configurar la mayoría de los navegadores para evitar que se coloquen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Más Información</h2>
            <p className="text-muted-foreground">
              Para más información sobre cómo gestionamos las cookies, contacta con nosotros en: 
              <a href="mailto:cookies@ivantechcoach.com" className="text-accent hover:underline ml-1">
                cookies@ivantechcoach.com
              </a>
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-12">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
