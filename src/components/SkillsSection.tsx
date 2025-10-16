import { motion } from 'framer-motion'
import { Code, Palette, Monitor } from 'lucide-react'

const programmingLanguages = [
  { name: 'HTML', icon: '🌐', color: '#E34F26' },
  { name: 'CSS', icon: '🎨', color: '#1572B6' },
  { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Node.js', icon: '🟢', color: '#339933' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'Tailwind', icon: '🌬️', color: '#F24E1E' }
]

const designTools = [
  { name: 'Figma', icon: '🎯', color: '#F24E1E' }
]

const softwareTools = [
  { name: 'VS Code', icon: '💻', color: '#007ACC' },
  { name: 'Git', icon: '🔧', color: '#8b5cf6' }
]

const SkillCard = ({ title, skills, icon: Icon, delay }: {
  title: string
  skills: Array<{ name: string; icon: string; color: string }>
  icon: any
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="glass rounded-2xl p-6 border-glass-border hover:glow-primary transition-all duration-500 group"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-primary rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold gradient-text">{title}</h3>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + (index * 0.1) }}
          viewport={{ once: true }}
          className="flex items-center gap-3 p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-all duration-300 cursor-pointer group/item"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-sm font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-background/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <SkillCard
            title="Programming Languages"
            skills={programmingLanguages}
            icon={Code}
            delay={0.2}
          />
          
          <SkillCard
            title="Design Tools"
            skills={designTools}
            icon={Palette}
            delay={0.4}
          />
          
          <SkillCard
            title="Software & IDEs"
            skills={softwareTools}
            icon={Monitor}
            delay={0.6}
          />
        </div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-secondary rounded-full blur-3xl opacity-20"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-accent rounded-full blur-2xl opacity-30"
            animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      </div>
    </section>
  )
}