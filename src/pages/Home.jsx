import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import {
  LineChart,
  CloudSun,
  Users
} from 'lucide-react';
import marketImg from '../Assets/market.jpg';
import weatherImg from '../Assets/weather.jpg';
import supervisionImg from '../Assets/supervision.webp';
import Footer from '../components/Footer';

 // Assuming you have these images in your assets folder


function Home() {
  const whyRef = useRef(null);
  const navigate = useNavigate();

  const scrollToWhySection = () => {
    if (whyRef.current) {
      whyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col min-h-screen">
        
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" bg-primary text-white text-center py-20"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome To AgroMate</h1>
        <p className="text-lg mb-6">
          Connect with farmer regulators, track market price, and get weather updates all in one place
        </p>
        <button
          onClick={scrollToWhySection}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded"
        >
          Get Started
        </button>
      </motion.section>

      {/* Why Choose Section */}
      <section ref={whyRef} className="py-16 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Why Choose AgroMate?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 text-gray-600"
        >
          Our platform provides essential tools and information to help you maximize your farming potential
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 max-w-6xl mx-auto">
          {[{
            icon: <LineChart className="h-12 w-12 text-green-700 mb-4" />,
            title: 'Real-time Market Prices',
            desc: 'Discover real-time updated agricultural market prices to make informed selling decisions.',
            Image: <img src={marketImg}/>
          }, {
            icon: <CloudSun className="h-12 w-12 text-green-700 mb-4" />,
            title: 'Weather Forecasts',
            desc: 'Access detailed weather forecasts to help you manage farming activities effectively.',
            Image: <img src={weatherImg} />
          }, {
            icon: <Users className="h-12 w-12 text-green-700 mb-4" />,
            title: 'Expert Supervision',
            desc: 'Connect with agricultural experts for the best guidance in your farming journey.',
            Image: <img src= {supervisionImg} />
          }].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {feature.icon}
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-primary text-white text-center py-16"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="mb-6">
          Join thousands of farmers who are already benefiting from our smart farming solutions
        </p>
        <button
          onClick={()=>navigate('/Login')}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded"
        >
          Join AgroMate Today
        </button>
      </motion.section>
    </div>
    <Footer />
    </>
  );
};

export default Home;
