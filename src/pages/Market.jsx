import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronUpIcon, ChevronDownIcon, MinusIcon } from '@heroicons/react/24/solid';

const categories = [
  { id: 'grains', name: 'Grains', sinhala: 'ධාන්‍ය' },
  { id: 'fruits', name: 'Fruits', sinhala: 'පලතුරු' },
  { id: 'cashcrops', name: 'Cash Crops', sinhala: 'මුදල් බෝග' },
  { id: 'spices', name: 'Spices', sinhala: 'කුළුබඩු' }
];

export default function Market() {
 
  const [selectedCategory, setSelectedCategory] = useState('grains');
  const [searchTerm, setSearchTerm] = useState('');
  const [marketData, setMarketData] = useState({
    grains: [],
    fruits: [],
    cashcrops: [],
    spices: []
  });

  useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/farmer/market-prices',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }); // Update endpoint as needed
        console.log('API DATA:', res.data); 
        setMarketData(res.data);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      }
    };

    fetchMarketPrices();
  }, []);

  const filteredProducts = (marketData[selectedCategory].filter(product =>
    (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.sinhala && product.sinhala.includes(searchTerm))||
    (product.product && product.product.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.cropName && product.cropName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.cropVariety && product.cropVariety.toLowerCase().includes(searchTerm.toLowerCase())) 
  )
  );

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return<div className='flex justify-center'> <ChevronUpIcon className="h-5 w-5 t text-red-500" /> </div>;
      case 'down':
        return <div className='flex justify-center'><ChevronDownIcon className="h-5 w-5 text-green-500" /> </div>;
      default:
        return <div className='flex justify-center'><MinusIcon className="h-5 w-5 text-gray-500" /> </div>;
    }
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Market Prices
        </h1>
        <p className="text-lg text-gray-600">
          Current agricultural market prices in Sri Lanka
        </p>
      </motion.div>

      {/* Category buttons & search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
                ${selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <span>{category.name}</span>
              <span className="ml-2 text-sm">({category.sinhala})</span>
            </motion.button>
          ))}
        </div>

         <div className="max-w-md mx-auto">
          <input
            id='search'
            name='search'
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
         </div>
        </div>

        {/* Data Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">සිංහල</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Price (LKR)</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Unit</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Trend</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ product.crop ?? 'N/A'}
                   </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.sinhala}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">{product.unit}</td>
                  <td
                 
                  className="px-6 py-4 textAlign: ">{getTrendIcon(product.trend || 'stable')}</td>
                  <td className={`px-6 py-4 text-center text-sm font-medium 
                    ${product.trend === 'up' ? 'text-red-500 ': ''}
                    ${product.trend === 'down' ? 'text-green-500' : ''}
                    ${product.trend === 'stable' ? 'text-gray-500' : ''}`}>
                    {typeof product.change === 'number' ? (product.change > 0 ? '+' : '') + product.change : '—'}

                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
        </div>
      
    </>
  );
}