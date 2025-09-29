import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { FaReddit } from 'react-icons/fa'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Gaby6632', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/gabi-j-5b4199355/', label: 'LinkedIn' },
  { icon: FaReddit, href: 'https://www.reddit.com/user/gaby6632/', label: 'Reddit' },
  { icon: Mail, href: 'mailto:gabrieljoian14@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-card/30 backdrop-blur-sm">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4">Gabriel Joian</h3>
            <p className="text-muted-foreground">
              Creative Developer crafting immersive digital experiences 
              through innovative web technologies and 3D artistry.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-secondary transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>gabrieljoian14@gmail.com</p>
              <p>+40 0752857960</p>
              <p>Romania, VL</p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center space-x-6 mb-8"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-3 glass rounded-full hover:glow-secondary transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
              </motion.a>
            )
          })}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center pt-8 border-t border-glass-border"
        >
          <p className="text-muted-foreground flex items-center justify-center space-x-2">
            <span>© 2025 Gabriel Joian. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>and lots of coffee.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}