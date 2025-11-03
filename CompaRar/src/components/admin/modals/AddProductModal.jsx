import React, { useState, useEffect, useRef } from 'react';
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

/**
 * Modal para agregar un nuevo producto o editar uno existente.
 * En modo de edición, solo se pueden modificar los datos del producto.
 * En modo de creación, se agrega el producto junto con su primer precio en un establecimiento.
 */
const AddProductModal = ({ isOpen, setIsOpen, productToEdit, clearProductToEdit }) => {
  const { addProductAndPrice, establishments, updateProduct } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    imagen_url: '',
    codigo_barras: '',
    establecimiento_id: '',
    precio: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const isEditMode = !!productToEdit;

  // Efecto para inicializar el formulario cuando se abre el modal.
  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        nombre: productToEdit.nombre || '',
        descripcion: productToEdit.descripcion || '',
        categoria: productToEdit.categoria || '',
        imagen_url: productToEdit.imagen_url || '',
        codigo_barras: productToEdit.codigo_barras || '',
        establecimiento_id: '',
        precio: '',
      });
      setImagePreview(productToEdit.imagen_url || '');
      setImageFile(null);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: '',
        imagen_url: '',
        codigo_barras: '',
        establecimiento_id: '',
        precio: '',
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [productToEdit, isEditMode, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Maneja la selección de un archivo de imagen.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, establecimiento_id: value }));
  };

  // Cierra el modal y limpia el estado de edición.
  const handleClose = () => {
    setIsOpen(false);
    clearProductToEdit();
  };

  // Maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEditMode) {
      // Lógica para actualizar un producto existente.
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        imagen_url: formData.imagen_url,
        codigo_barras: formData.codigo_barras,
      };
      const { error } = await updateProduct(productToEdit.id, productData, imageFile);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error al actualizar',
          description: error.message || 'Hubo un problema al guardar los cambios.',
        });
      } else {
        toast({
          title: '¡Producto actualizado!',
          description: 'Los cambios se han guardado correctamente.',
        });
        handleClose();
      }
    } else {
      // Lógica para crear un nuevo producto y su precio.
      if (!formData.establecimiento_id || !formData.precio) {
        toast({
          variant: 'destructive',
          title: 'Campos requeridos',
          description: 'Por favor, selecciona un establecimiento y agrega un precio.',
        });
        setIsSubmitting(false);
        return;
      }
      
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        imagen_url: formData.imagen_url,
        codigo_barras: formData.codigo_barras,
      };

      const priceData = {
        establecimiento_id: formData.establecimiento_id,
        precio: parseFloat(formData.precio),
      };

      const { productError, priceError } = await addProductAndPrice(productData, priceData, imageFile);

      if (productError || priceError) {
        toast({
          variant: 'destructive',
          title: 'Error al agregar producto',
          description: productError?.message || priceError?.message || 'Hubo un problema al guardar.',
        });
      } else {
        toast({
          title: '¡Producto agregado!',
          description: 'El nuevo producto y su precio se han guardado correctamente.',
        });
        handleClose();
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto y Precio'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Modifica los detalles del producto.' : 'Completa los detalles del nuevo producto y su precio inicial.'}
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
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Input id="descripcion" value={formData.descripcion} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoría
              </Label>
              <Input id="categoria" value={formData.categoria} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo_barras" className="text-right">
                Código Barras
              </Label>
              <Input id="codigo_barras" value={formData.codigo_barras} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Imagen
              </Label>
              <div className="col-span-3">
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Imagen
                </Button>
                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Vista previa" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </div>
            {!isEditMode && (
              <>
                <div className="grid grid-cols-4 items-center gap-4 border-t pt-4 mt-2">
                  <Label htmlFor="establecimiento_id" className="text-right">
                    Establecimiento
                  </Label>
                  <Select onValueChange={handleSelectChange} value={formData.establecimiento_id}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un establecimiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {establishments.map((est) => (
                        <SelectItem key={est.id} value={String(est.id)}>{est.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="precio" className="text-right">
                    Precio
                  </Label>
                  <Input id="precio" type="number" step="0.01" value={formData.precio} onChange={handleChange} className="col-span-3" required />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Guardar Producto')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;