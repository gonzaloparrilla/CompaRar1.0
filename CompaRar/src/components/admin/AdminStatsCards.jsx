import React from 'react';
import { motion } from 'framer-motion';
import { Package, Store, DollarSign, Tag } from 'lucide-react';

const AdminStatsCards = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <div
            key={tab.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer card-hover"
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{tab.label}</p>
                <p className="text-2xl font-bold text-gray-800">{tab.count}</p>
              </div>
              <div className={`p-3 rounded-full ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default AdminStatsCards;