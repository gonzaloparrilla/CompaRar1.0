import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';

/**
 * Modal para editar un precio existente.
 * Permite actualizar el monto del precio y su fecha de actualización.
 */
const EditPriceModal = ({ isOpen, setIsOpen, priceToEdit, clearPriceToEdit }) => {
  const { updatePrice } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    precio: '',
    fecha_actualizacion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para cargar los datos del precio a editar cuando el modal se abre.
  useEffect(() => {
    if (priceToEdit) {
      setFormData({
        precio: priceToEdit.precio || '',
        fecha_actualizacion: priceToEdit.fecha_actualizacion ? new Date(priceToEdit.fecha_actualizacion).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      });
    }
  }, [priceToEdit, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Cierra el modal y limpia el estado de edición.
  const handleClose = () => {
    setIsOpen(false);
    clearPriceToEdit();
  };

  // Maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const priceData = {
      precio: parseFloat(formData.precio),
      fecha_actualizacion: formData.fecha_actualizacion,
    };

    const { error } = await updatePrice(priceToEdit.id, priceData);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error.message || 'Hubo un problema al guardar los cambios.',
      });
    } else {
      toast({
        title: '¡Precio actualizado!',
        description: 'El precio se ha actualizado correctamente.',
      });
      handleClose();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Precio</DialogTitle>
          <DialogDescription>
            Actualiza el precio y la fecha de modificación.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio
              </Label>
              <Input id="precio" type="number" step="0.01" value={formData.precio} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha_actualizacion" className="text-right">
                Fecha
              </Label>
              <Input id="fecha_actualizacion" type="date" value={formData.fecha_actualizacion} onChange={handleChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPriceModal;