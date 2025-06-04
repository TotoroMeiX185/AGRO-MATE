import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import based on your context structure

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

//const { user } = useAuth(); // or wherever you're storing the user

function Footer() {

  const { user } = useAuth();

const commonLinks = [
    { to: "/", text: "Home" },
    //{ to: "/farmer/farmers", text: "Farmer" }
  ];
  const farmerLinks = [
    { to: "/farmer/dashboard", text: "Dashboard" },
    { to: "/farmer/crops", text: "Crops" },
    { to: "/farmer/finance", text: "Finance" },
    { to: "/farmer/market", text: "Market" }
  ];
  const adminLinks = [
    { to: "/admin/dashboard", text: "Dashboard" },
    { to: "/admin/farmers", text: "Farmer" },
    { to: "/admin/crops", text: "Crops" },
    { to: "/admin/market", text: "Market" },
    { to: "/admin/finance", text: "Finance" }
  ];

  let roleLinks = [];
  let roleTitle = "";

  if (user?.role === "admin") {
    roleLinks = adminLinks;
    roleTitle = "Quick Links"
  } else if (user?.role === "farmer") {
   roleLinks = farmerLinks;
   roleTitle = "Quick Links"
  }

const allLinks = [...commonLinks, ...roleLinks];


  return (
    <motion.footer 
      className="bg-gray-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl font-bold mb-4"
              whileHover={{ x: 5 }}
            >
              Agromate
            </motion.h3>
            <p className="text-gray-400">
              Empowering farmers with smart solutions for better agriculture.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-4"
              whileHover={{ x: 5 }}
            >
             {roleTitle || "Quick Links"}
            </motion.h4>
            <ul className="space-y-2">
              {allLinks.map((link)=> (
                <motion.li 
                  key={link.to}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-lg font-semibold mb-4"
              whileHover={{ x: 5 }}
            >
              Contact
            </motion.h4>
            <ul className="space-y-2">
              {[
                "Email: pothubandana@agromate.com",
                "Phone: +94 764139185",
                "Address: Pothubandana, Aiwela, Bibile."
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="text-gray-400"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div 
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Agromate. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
export default Footer;