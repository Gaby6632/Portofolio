import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const projects = [
  {
    id: 1,
    title: 'GabiAI',
    description: 'GabiAI is a personal AI assistant that helps you manage your tasks and schedule more efficiently. Not done yet.',
    image: '/gabiai.png',
    href: 'https://www.gabiai.net'
  },
  {
    id: 2,
    title: 'Timetable', 
    description: 'Our class timetable for easy planning.',
    image: '/classtime.png',
    href: 'https://classtime8b.onrender.com/'
  },
  {
    id: 3,
    title: 'Tehno Project',
    description: 'This is a website for my tehnology class, the project is about Power Plants, especially Nuclear Power Plants.',
    image: '/tehno-prj.png',
    href: 'https://tehno-project.vercel.app/'
  }
]

export default function ProjectsSection() {
  return (
    <section id="portfolio" className="section-padding bg-background/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest work and creative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
            >
              <Card className="glass border-glass-border hover:glow-primary transition-all duration-500 group cursor-pointer h-full">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div 
                      className="w-full h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}