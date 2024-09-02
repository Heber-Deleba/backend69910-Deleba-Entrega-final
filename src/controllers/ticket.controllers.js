import ticketService from '../services/ticket.service.js';

const ticketController = {
  
  getAllTickets: async (req, res) => {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los tickets",
        details: error.message,
      });
    }
  },

  
  getTicketById: async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await ticketService.getTicketById(id);
      if (ticket) {
        res.json(ticket);
      } else {
        res.status(404).json({ error: "Ticket no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el ticket",
        details: error.message,
      });
    }
  },

  
  createTicket: async (req, res) => {
    try {
      const ticketData = req.body;
      const newTicket = await ticketService.createTicket(ticketData);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el ticket",
        details: error.message,
      });
    }
  },
};

export default ticketController;


