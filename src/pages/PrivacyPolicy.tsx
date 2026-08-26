import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
            <p className="text-muted-foreground mb-4">
              En IvanTechCoach recopilamos información personal cuando te suscribes a nuestro newsletter o descargas nuestros recursos gratuitos. 
              Esta información puede incluir tu nombre y dirección de correo electrónico.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Enviar contenido educativo y recursos técnicos</li>
              <li>Notificarte sobre nuevos servicios o contenidos</li>
              <li>Responder a tus consultas y solicitudes</li>
              <li>Mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Protección de Datos</h2>
            <p className="text-muted-foreground mb-4">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra el acceso no autorizado, 
              la alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Tus Derechos</h2>
            <p className="text-muted-foreground mb-4">
              De acuerdo con el RGPD, tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contacto</h2>
            <p className="text-muted-foreground">
              Para cualquier consulta sobre esta política de privacidad, puedes contactarnos en: 
              <a href="mailto:privacy@ivantechcoach.com" className="text-accent hover:underline ml-1">
                privacy@ivantechcoach.com
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

export default PrivacyPolicy;
