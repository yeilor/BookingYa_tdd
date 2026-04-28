import { test, expect } from '@playwright/test';

// Simulación de tu servicio (igual lógica que en Java)
class ReservaService {
  reservas: any[] = [];
  id = 1;

  crear(reserva: any) {
    reserva.id = this.id++;
    this.reservas.push(reserva);
    return reserva;
  }

  obtenerPorId(id: number) {
    return this.reservas.find(r => r.id === id);
  }

  actualizar(id: number, nuevoUsuario: string) {
    const reserva = this.obtenerPorId(id);
    if (reserva) {
      reserva.usuario = nuevoUsuario;
    }
    return reserva;
  }

  eliminar(id: number) {
    this.reservas = this.reservas.filter(r => r.id !== id);
  }
}

test('Crear una reserva', async () => {
  const service = new ReservaService();

  const reserva = service.crear({
    usuario: 'Yeimy Marin',
    fecha: '2026-05-01'
  });

  expect(reserva).toBeDefined();
  expect(reserva.usuario).toBe('Yeimy Marin');
  expect(reserva.fecha).toBe('2026-05-01');
});

test('Consultar una reserva por ID', async () => {
  const service = new ReservaService();

  const creada = service.crear({
    usuario: 'Yeimy Marin',
    fecha: '2026-05-01'
  });

  const consulta = service.obtenerPorId(creada.id);

  expect(consulta).toBeDefined();
  expect(consulta?.id).toBe(creada.id);
});

test('Actualizar una reserva', async () => {
  const service = new ReservaService();

  const creada = service.crear({
    usuario: 'Yeimy Marin',
    fecha: '2026-05-01'
  });

  const actualizada = service.actualizar(creada.id, 'Usuario Actualizado');

  expect(actualizada).toBeDefined();
  expect(actualizada?.usuario).toBe('Usuario Actualizado');
});

test('Eliminar una reserva', async () => {
  const service = new ReservaService();

  const creada = service.crear({
    usuario: 'Yeimy Marin',
    fecha: '2026-05-01'
  });

  service.eliminar(creada.id);

  const resultado = service.obtenerPorId(creada.id);

  expect(resultado).toBeUndefined();
});