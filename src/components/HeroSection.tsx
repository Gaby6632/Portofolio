import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Interactive3DCard from './Interactive3DCard'
import Img1 from '@/assets/img1.jpeg'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center section-padding pt-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Photo */}
            <motion.div
              className=""
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
<div className="relative w-40 h-40 rounded-full overflow-hidden">
  {/* avatar as background */}
  <div
    aria-hidden="true"
    style={{
      outline: '3px solid rgba(255, 255, 255, 1)', // contur alb semi-transparent
      outlineOffset: '4px',                  // distanța dintre contur și imagine
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',    // centrare perfectă
      width: '95%',
      height: '95%',
      backgroundImage: `url(${Img1})`,
      backgroundPosition: 'center center', // centrare pe ambele axe
      backgroundSize: 'cover',             // umple complet containerul
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none'
    }}
    className="rounded-full"
  />

  {/* overlay pentru blocarea click/drag */}
  <div
    onContextMenu={(e) => e.preventDefault()}
    onMouseDown={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
    className="absolute inset-0 z-10 rounded-full"
  />

</div>


            </motion.div>

            <div className="space-y-4">
              <motion.p 
                className="text-secondary font-medium tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to my portfolio
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hi, I'm{' '}
                <span className="gradient-text">Gabriel Joian</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Creative Developer
              </motion.p>
              
              <motion.p 
                className="text-lg text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                I craft interactive web solutions that combine clean code with engaging design.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              
            <a
              className="glass border-glass-border hover:glow-secondary hover:bg-green-700 inline-block text-center px-6 py-3 rounded-lg border"
              href="/Gabi_Joian_Resume.pdf"
              download
            >
              Download Resume
            </a>

            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: Github, href: 'https://github.com/Gaby6632', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/gabi-j-5b4199355/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:gabrieljoian14@gmail.com', label: 'Email' },
              ].map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-3 glass rounded-full hover:glow-secondary transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Interactive3DCard />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-secondary rounded-full blur-xl opacity-60"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-accent rounded-full blur-xl opacity-40"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 cursor-pointer group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm text-muted-foreground group-hover:text-secondary transition-colors">
              Scroll Down
            </span>
            <ArrowDown className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}