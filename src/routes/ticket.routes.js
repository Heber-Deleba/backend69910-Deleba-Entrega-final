import { Router } from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { createTicketDto } from '../dtos/ticket.dto.js';
import { ticketController } from '../controllers/ticket.controller.js';
import { authorizations } from '../middlewares/authorization.middleware.js';

const router = Router();


router.get("/", ticketController.getAllTickets);


router.get("/:id", ticketController.getTicketById);


router.post(
  "/",
  authorizations(["user", "admin"]), 
  validate(createTicketDto),
  ticketController.createTicket
);

export default router;


