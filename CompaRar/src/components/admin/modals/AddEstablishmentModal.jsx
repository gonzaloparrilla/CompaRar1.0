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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

const AddEstablishmentModal = ({ isOpen, setIsOpen, establishmentToEdit, clearEstablishmentToEdit }) => {
  const { addEstablishment, updateEstablishment } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    tipo: 'supermercado',
    horarios: '',
    imagen_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!establishmentToEdit;

  useEffect(() => {
    if (isEditMode && establishmentToEdit) {
      setFormData({
        nombre: establishmentToEdit.nombre || '',
        direccion: establishmentToEdit.direccion || '',
        telefono: establishmentToEdit.telefono || '',
        tipo: establishmentToEdit.tipo || 'supermercado',
        horarios: establishmentToEdit.horarios || '',
        imagen_url: establishmentToEdit.imagen_url || '',
      });
      setImagePreview(establishmentToEdit.imagen_url || '');
      setImageFile(null); // Reset file input on edit
    } else {
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
        tipo: 'supermercado',
        horarios: '',
        imagen_url: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [establishmentToEdit, isEditMode, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, tipo: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(establishmentToEdit?.imagen_url || '');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (clearEstablishmentToEdit) {
        clearEstablishmentToEdit();
    }
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let error;
    
    if (isEditMode) {
      const result = await updateEstablishment(establishmentToEdit.id, formData, imageFile);
      error = result.error;
    } else {
      const result = await addEstablishment(formData, imageFile);
      error = result.error;
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: `Error al ${isEditMode ? 'actualizar' : 'agregar'} establecimiento`,
        description: error.message || 'Hubo un problema al guardar.',
      });
    } else {
      toast({
        title: `¡Establecimiento ${isEditMode ? 'actualizado' : 'agregado'}!`,
        description: `El establecimiento se ha ${isEditMode ? 'actualizado' : 'guardado'} correctamente.`,
      });
      handleClose();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Establecimiento' : 'Agregar Nuevo Establecimiento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Modifica los detalles del establecimiento.' : 'Completa los detalles del nuevo establecimiento.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input id="nombre" value={formData.nombre} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input id="direccion" value={formData.direccion} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input id="telefono" value={formData.telefono} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="horarios" className="text-right">
                Horarios
              </Label>
              <Input id="horarios" value={formData.horarios} onChange={handleChange} className="col-span-3" />
            </div>
            
            {/* Campo de subida de imagen */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Logo
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" />
                {imagePreview && (
                  <img src={imagePreview} alt="Previsualización del logo" className="w-24 h-24 object-cover rounded-md mt-2" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo" className="text-right">
                Tipo
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.tipo}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supermercado">Supermercado</SelectItem>
                  <SelectItem value="mayorista">Mayorista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Agregar')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEstablishmentModal;