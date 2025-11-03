import React from 'react';
import { motion } from 'framer-motion';

const AdminHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Panel de Administración
      </h1>
      <p className="text-gray-600">
        Gestiona productos, establecimientos, precios y ofertas
      </p>
    </motion.div>
  );
};

export default AdminHeader;