import { Request, Response } from 'express';
import * as zenvia from '@zenvia/sdk';

class MessagesController {
  async index(request: Request, response: Response): Promise<any> {
    const { message, to } = request.body;

    if (!message || !to) {
      return response
        .status(400)
        .json({ error: 'Please type an message to someone' });
    }

    const client = new zenvia.Client(process.env.ZENVIA_TOKEN as string);
    const whatsapp = client.getChannel('whatsapp');
    const content = new zenvia.TextContent(message);

    try {
      const data = await whatsapp.sendMessage('flaxen-pigment', to, content);
      return response.json(data);
    } catch (error) {
      return response.json({ message: 'Ocorreu um erro inesperado' });
    }
  }
}

export default MessagesController;
