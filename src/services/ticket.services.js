import { ticketDao } from '../daos/ticketDao.js';

export const createTicket = async (ticketData) => {
  
  if (!ticketData.code || !ticketData.purchase_datetime || !ticketData.amount || !ticketData.purchaser) {
    throw new Error('Datos del ticket incompletos');
  }

  const existingTicket = await ticketDao.getTicketByCode(ticketData.code);
  if (existingTicket) {
    throw new Error('Ya existe un ticket con ese código');
  }

  const newTicket = await ticketDao.createTicket(ticketData);
  return newTicket;
};

export const getAllTickets = async () => {
  try {
    return await ticketDao.getAllTickets();
  } catch (error) {
    throw new Error('Error al obtener los tickets');
  }
};

export const getTicketById = async (id) => {
  try {
    const ticket = await ticketDao.getTicketById(id);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }
    return ticket;
  } catch (error) {
    throw new Error('Error al obtener el ticket');
  }
};
