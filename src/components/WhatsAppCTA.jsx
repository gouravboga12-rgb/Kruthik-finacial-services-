import { MessageCircle } from 'lucide-react'

const WhatsAppCTA = () => {
  const phoneNumber = '7026133444'
  const message = encodeURIComponent('Hello, I am interested in your loan services. Please assist me.')
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group animate-bounce"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative">
        <MessageCircle size={32} />
        <span className="absolute -top-12 right-0 bg-white text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/10">
          Chat with us!
        </span>
      </div>
    </a>
  )
}

export default WhatsAppCTA
