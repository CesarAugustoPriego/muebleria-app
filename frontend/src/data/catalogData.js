// categorías y rutas de modelo
export const categorias = [
  {
    id: 'recamara', nombre: 'Recámara y Estudio',
    items: [
      { path: '/catalogo/recamara/camas', label: 'Camas' },
      { path: '/catalogo/recamara/literas', label: 'Literas' },
      { path: '/catalogo/recamara/escritorios', label: 'Escritorios' },
      { path: '/catalogo/recamara/armarios', label: 'Armarios' },
      { path: '/catalogo/recamara/tocadores', label: 'Tocadores' },
    ],
  },
  {
    id: 'sala', nombre: 'Sala',
    items: [
      { path: '/catalogo/sala/sofas', label: 'Sofás' },
      { path: '/catalogo/sala/mesas-centro', label: 'Mesas de centro' },
      { path: '/catalogo/sala/libreros', label: 'Libreros' },
      { path: '/catalogo/sala/centros-entretenimiento', label: 'Centros de entretenimiento' },
    ],
  },
  {
    id: 'comedor', nombre: 'Comedor',
    items: [
      { path: '/catalogo/comedor/comedores', label: 'Comedores' },
    ],
  },
  {
    id: 'cocina', nombre: 'Cocina',
    items: [
      { path: '/catalogo/cocina/cocinas-integrales', label: 'Cocinas Integrales' },
      { path: '/catalogo/cocina/alacenas', label: 'Alacenas' },
    ],
  },
];
