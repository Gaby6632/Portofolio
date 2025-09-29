import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import emailjs from '@emailjs/browser'

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "gabrieljoian14@gmail.com",
    href: "mailto:gabrieljoian14@gmail.com"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+40752857960",
    href: "tel:+40752857960"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Romania, VL",
    href: "#"
  }
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      
         const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID!
         const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!
         const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Gabriel'
        },
        publicKey
      )

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      toast({
        title: "Failed to send message",
        description: "Please configure EmailJS credentials or try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate on something amazing.
            Drop me a message and let's start creating together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Talk</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hello, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 glass rounded-lg border border-glass-border hover:glow-secondary transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gradient-secondary rounded-full">
                      <Icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-secondary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-4 glass rounded-lg border border-glass-border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
                <span className="text-accent font-medium">Available for freelance</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Currently accepting new projects starting Q2 2024
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass border-glass-border">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name" 
                        className="glass border-glass-border focus:glow-primary"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email" 
                        className="glass border-glass-border focus:glow-primary"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject" 
                      className="glass border-glass-border focus:glow-primary"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message" 
                      rows={6}
                      className="glass border-glass-border focus:glow-primary resize-none"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glow-primary hover-glow bg-gradient-primary border-0"
                      size="lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}