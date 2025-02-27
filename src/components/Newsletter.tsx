
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="py-24 bg-[#e9e5e0]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUpVariants}
          className="text-center mb-8"
        >
          <h3 className="font-serif text-3xl md:text-4xl mb-4 font-light tracking-wider">Stay Connected</h3>
          <p className="text-[#595959] max-w-lg mx-auto">
            Subscribe to receive updates on new collections, exclusive events, and curated content.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeInUpVariants}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 py-3 px-4 border border-[#d1ccc4] focus:outline-none focus:border-[#a67c52] transition-colors bg-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#262626] text-white px-8 py-3 flex items-center justify-center group hover:bg-[#333] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span className="mr-2 tracking-wider text-sm">SUBSCRIBE</span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#595959] mt-3 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#a67c52] rounded-full mx-auto flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h4 className="font-serif text-xl mb-2">Thank you for subscribing</h4>
              <p className="text-[#595959]">
                You're now on our list and will be the first to know about new collections and exclusive offers.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
