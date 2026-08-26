import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import coachAvatar from '@/assets/coach-avatar.jpg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const HeroSection = () => {
  const techSkills = [
    'Troubleshooting N1-N2',
    'Scripting Python/Bash',
    'Ciberseguridad',
    'Automatización IT',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Automatiza tu Soporte IT y Escala tu Carrera con IA
              </h1>
              
              {/* Trust Quote */}
              <blockquote className="border-l-4 border-accent pl-4 italic text-lg opacity-90">
                "La verdadera transformación comienza cuando dominas las herramientas que automatizan tu trabajo."
              </blockquote>

              {/* Tech Skills Pills */}
              <div className="flex flex-wrap gap-2">
                {techSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA Principal - Lead Magnet */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 h-auto transition-all hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descarga 5 Scripts Gratis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Descarga tu Kit de Automatización</DialogTitle>
                  <DialogDescription>
                    Recibe 5 Scripts de Python/Bash para automatizar tareas IT comunes. Ingresa tu email:
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    Enviar Scripts a mi Email
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Coach Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl"></div>
              <img
                src={coachAvatar}
                alt="Ivan - IT & AI Coach"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Geometric Separator */}
      <div className="h-16 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
    </section>
  );
};
