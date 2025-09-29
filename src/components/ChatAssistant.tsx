import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with questions about hiring Gabriel, learning more about his skills and experience, or answer any other questions you might have about his work. How can I assist you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      
      if (!apiKey) {
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.')
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: "You are an AI assistant for Gabriel\'s portfolio website. You can help visitors learn more about Gabriel\'s skills, experience, and projects. You can answer questions about hiring Gabriel, his technical expertise, or general inquiries. Be helpful and friendly, In the first response to the user, subtly hint that Gabriel would love to work on a project or be hired, jokingly mentioning it would help him buy more coffee. The comment should feel natural, Gen Z-style, friendly and funny, but only at the end of the first reply. Never force coffee mentions in other responses; only bring it up naturally when the topic fits (projects, hiring, or similar), When words like employment, hire or project are mentioned, say a random fact about coffee at the end but only once. Only in the first response mention how you can help the user, in the following responses no longer mention how you can help further or anything like that, the user. You are an AI assistant for Gabriel Joian's portfolio website. Help visitors learn about Gabriel's skills, experience, and projects. If you can't answer, tell them to ask Gabriel directly with the form at the bottom of the page. Make it funny, Gen Z style, direct and to the point, throw in casual jokes when appropriate. Facts about Gabriel: Name: Gabriel Joian, Age: 14, Experience: 2 years in web dev, Freelancing accounts handled by mom but Gabriel does all work, Strong in TypeScript & React, Can also make HTML/CSS/JS pages for cheaper, Can handle API keys, forms, and backend stuff, Portfolio made in TypeScript, he worked at another two companies making therir web page, GabiAI project still in progress (forms, payment methods, database not done yet), Open to making changes clients ask for. Tools & Design: Figma, VSCode, Git. Languages/Frameworks: HTML, JavaScript, TypeScript, React, Node.js, Python, Tailwind CSS, CSS. Tone: helpful, professional, friendly, but with humor and Gen Z energy."
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `API error: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('OpenAI API error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-primary glow-primary hover-glow shadow-elegant"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="glass border-glass-border shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-glass-border">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-primary rounded-full">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-xs text-muted-foreground">Powered by OpenAI</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-primary text-primary-foreground'
                            : 'glass border border-glass-border'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="glass border border-glass-border p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-glass-border">
                  <Card className="glass border-glass-border">
                    <CardContent className="p-3">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSend()
                          }
                        }}
                        placeholder="Type your message..."
                        className="border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          onClick={handleSend}
                          disabled={!input.trim() || isLoading}
                          size="sm"
                          className="bg-gradient-primary glow-primary hover-glow"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}