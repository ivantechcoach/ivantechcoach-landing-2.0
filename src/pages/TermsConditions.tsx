import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-muted-foreground mb-4">
              Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso, 
              todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de las leyes locales aplicables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso del Contenido</h2>
            <p className="text-muted-foreground mb-4">
              El contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, imágenes y código, 
              es propiedad de IvanTechCoach y está protegido por las leyes de derechos de autor.
            </p>
            <p className="text-muted-foreground mb-4">
              Puedes descargar y utilizar el contenido educativo proporcionado gratuitamente para tu uso personal y profesional, 
              pero no puedes redistribuirlo con fines comerciales sin autorización previa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Servicios Profesionales</h2>
            <p className="text-muted-foreground mb-4">
              Los servicios de consultoría y coaching están sujetos a disponibilidad y a términos específicos que se acuerdan 
              individualmente con cada cliente. Los precios y condiciones pueden cambiar sin previo aviso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground mb-4">
              El contenido educativo y los scripts proporcionados se ofrecen "tal cual" sin garantías de ningún tipo. 
              IvanTechCoach no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo 
              que surja del uso o la imposibilidad de usar el material proporcionado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Modificaciones</h2>
            <p className="text-muted-foreground mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Ley Aplicable</h2>
            <p className="text-muted-foreground mb-4">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de España, 
              y cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales españoles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
            <p className="text-muted-foreground">
              Para cualquier pregunta sobre estos términos y condiciones, puedes contactarnos en: 
              <a href="mailto:legal@ivantechcoach.com" className="text-accent hover:underline ml-1">
                legal@ivantechcoach.com
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

export default TermsConditions;
