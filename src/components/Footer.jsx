import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white ">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 ">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">simplyfy</h2>
            <p className="mb-4 text-gray-300">Simplifying complex concepts with AI-powered explanations. Ask any doubt, get clear answers.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link href="/faq" className="hover:text-gray-300">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Help Centre</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-gray-300">Cookie Policy</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Privacy Policy</Link></li>
            </ul>
          </div>
        
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} simplyfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

