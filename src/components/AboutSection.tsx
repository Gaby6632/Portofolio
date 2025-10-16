import { motion } from 'framer-motion'
import { Code, Palette, Zap, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Img1 from '@/assets/img1.jpeg'

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, TypeScript, Next.js, Three.js",
    color: "primary"
  },
  {
    icon: Palette,
    title: "3D Design",
    description: "Blender, Cinema 4D, WebGL",
    color: "secondary"
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimization, PWA, WebAssembly",
    color: "accent"
  },
  {
    icon: Award,
    title: "Experience",
    description: "2+ years in web development",
    color: "primary"
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a keen eye for detail and a love for creating 
            immersive digital experiences that push the boundaries of web technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Creative Problem Solver</h3>
              <p className="text-muted-foreground leading-relaxed">
                With over 2 years of experience in web development, I specialize in creating 
                interactive and visually stunning applications. My expertise spans from modern 
                frontend frameworks to 3D graphics programming.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of technology to create meaningful connections and 
                memorable experiences. Every project is an opportunity to push creative 
                boundaries and deliver exceptional results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I create these projects to help companies build sleek, modern websites and 
                improve their digital presence… but let’s be honest, I mostly do it so I can 
                buy more coffee. Any support is appreciated!
                </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium">Technologies I Love</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'React', 'TypeScript', 'Three.js', 'WebGL', 'Framer Motion',
                  'Tailwind CSS', 'Node.js', 'Python', 'Figma'
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 glass rounded-full text-sm border border-glass-border"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
<div className="aspect-square glass rounded-2xl p-1 relative overflow-hidden group outline">
  {/* Fundal gradient + imagine */}
  <div
    className="w-full h-full rounded-2xl bg-gradient-secondary relative flex items-center justify-center"
    style={{
      backgroundImage: "url('/CodingImg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
  </div>

  {/* Glow la hover */}
  <div className="absolute inset-0 glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>


          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass border-glass-border h-full group hover:glow-primary transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-${skill.color}`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}