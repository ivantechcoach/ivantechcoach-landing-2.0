import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Terminal, Shield, Zap } from 'lucide-react';

export const ServicesGrid = () => {
  const services = [
    {
      icon: Zap,
      title: 'Automatización IT',
      description: 'Scripts personalizados en Python/Bash para automatizar tareas repetitivas y optimizar flujos de trabajo.',
      features: ['Scripts de respaldo', 'Monitoreo de sistemas', 'Despliegue automatizado'],
    },
    {
      icon: Terminal,
      title: 'Troubleshooting Avanzado',
      description: 'Soporte técnico especializado N1-N2 con metodologías probadas para resolver incidentes complejos.',
      features: ['Diagnóstico rápido', 'Resolución de incidentes', 'Documentación técnica'],
    },
    {
      icon: Shield,
      title: 'Consultoría en Ciberseguridad',
      description: 'Evaluación de vulnerabilidades y mejores prácticas para proteger tu infraestructura IT.',
      features: ['Auditoría de seguridad', 'Hardening de sistemas', 'Capacitación en buenas prácticas'],
    },
  ];

  return (
    <section id="servicios" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios Profesionales</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones técnicas especializadas para profesionales IT que buscan escalar su expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div id="consulta" className="text-center mt-12">
          <Button size="lg" variant="default" className="px-8 py-6 h-auto text-lg">
            Agenda tu Consultoría (Servicio de Pago)
          </Button>
        </div>
      </div>
    </section>
  );
};
