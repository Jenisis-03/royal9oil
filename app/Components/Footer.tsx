"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Footer = () => {
  return (
    <footer className="bg-[#004526] text-[#DFFF00] lg:pl-[calc(16rem-1px)] w-full transition-all duration-300 ease-in-out">
      <div className="w-full py-9 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              {...fadeInUp}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold font-merriweather">Royal 9</h3>
              <p className="text-sm">© 2024 Royal 9. All rights reserved.</p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              {...fadeInUp}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="flex-shrink-0" />
                  <p className="text-sm break-words">123 Oil Street, Engine City, EC 12345</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={20} className="flex-shrink-0" />
                  <p className="text-sm">+1 (234) 567-8900</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={20} className="flex-shrink-0" />
                  <p className="text-sm break-words">contact@royal9.com</p>
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              {...fadeInUp}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeInUp}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none focus:ring-2 focus:ring-[#DFFF00] rounded-full p-1"
                  >
                    <Instagram size={24} />
                  </motion.div>
                </Link>
                <Link 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none focus:ring-2 focus:ring-[#DFFF00] rounded-full p-1"
                  >
                    <Twitter size={24} />
                  </motion.div>
                </Link>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none focus:ring-2 focus:ring-[#DFFF00] rounded-full p-1"
                  >
                    <Facebook size={24} />
                  </motion.div>
                </Link>
                <Link 
                  href="mailto:contact@royal9.com"
                  className="hover:text-white transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none focus:ring-2 focus:ring-[#DFFF00] rounded-full p-1"
                  >
                    <Mail size={24} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-[#DFFF00]/20 mt-8 pt-8 text-center text-sm">
            <p>Designed and Developed with ❤️ by Royal 9 Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;