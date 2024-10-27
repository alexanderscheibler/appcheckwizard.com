export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Contact Me</h2>
        <div className="max-w-md mx-auto">
          <form action="https://getform.io/f/bzyyljxa" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded bg-gray-700"
                     autoComplete="name" required/>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded bg-gray-700"
                     autoComplete="email" required/>
            </div>
            <input type="hidden" name="_gotcha" className="hidden" aria-hidden="true"/>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 rounded bg-gray-700"
                        required></textarea>
            </div>
            <button type="submit"
                    className="w-full outline hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}