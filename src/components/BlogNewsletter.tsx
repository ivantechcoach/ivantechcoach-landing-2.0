import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock } from 'lucide-react';

export const BlogNewsletter = () => {
  const blogPosts = [
    {
      title: '5 Scripts de Python que Todo Soporte IT Debe Conocer',
      excerpt: 'Automatiza tareas comunes como limpieza de logs, monitoreo de servicios y backups automáticos.',
      date: '2024-01-15',
      readTime: '5 min',
    },
    {
      title: 'Cómo Implementar Zero Trust en tu Infraestructura',
      excerpt: 'Guía práctica para aplicar principios de Zero Trust Security en entornos empresariales.',
      date: '2024-01-10',
      readTime: '8 min',
    },
    {
      title: 'Troubleshooting Avanzado: Metodología de Diagnóstico',
      excerpt: 'Framework paso a paso para resolver incidentes complejos de manera sistemática y eficiente.',
      date: '2024-01-05',
      readTime: '6 min',
    },
  ];

  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Blog Posts */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contenido Técnico</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Artículos prácticos sobre automatización, seguridad y mejores prácticas IT
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="px-0 text-accent">
                    Leer más →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">Suscríbete al Newsletter</CardTitle>
              <CardDescription className="text-base">
                Recibe contenido exclusivo, tutoriales avanzados y recursos técnicos directamente en tu inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newsletter-name">Nombre</Label>
                    <Input 
                      id="newsletter-name" 
                      type="text" 
                      placeholder="Tu nombre" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newsletter-email">Email</Label>
                    <Input 
                      id="newsletter-email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Suscribirme Ahora
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
