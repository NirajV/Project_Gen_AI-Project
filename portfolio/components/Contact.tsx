export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-950 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400">Get in Touch</h2>
        <div className="space-y-4 text-lg text-slate-300">
          <p>
            <strong>Mobile:</strong> <a href="tel:+14848026153" className="text-blue-400 hover:underline">484 802 6153</a>
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:niraj.k.vishwakarma@gmail.com" className="text-blue-400 hover:underline">niraj.k.vishwakarma@gmail.com</a>
          </p>
          <p>
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nirajkv-73384914" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/nirajkv-73384914</a>
          </p>
          <p>
            <strong>Location:</strong> Danville, Pennsylvania, United States
          </p>
        </div>
        <div className="mt-12 p-8 bg-slate-800 rounded-lg">
          <p className="text-slate-300">
            I'm always interested in discussing new projects, career opportunities, and interesting technical challenges. Feel free to reach out!
          </p>
        </div>
      </div>
    </section>
  )
}
