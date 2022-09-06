import { Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await userRepository.find();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { name, email, apartment, password } = req.body;

    const user = userRepository.create({ name, email, apartment, password });
    await userRepository.save(user);

    return res
      .status(201)
      .json(`O usuário ${user.name} foi criado com sucesso`);
  }

  async update(req: Request, res: Response) {
    const { name, email, apartment, password } = req.body;

    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    userRepository.merge(user, { name, email, apartment, password });
    await userRepository.save(user);

    return res.json({ message: "Usuário atualizado com sucesso" });
  }

  async delete(req: Request, res: Response) {
    const user = await userRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await userRepository.remove(user);

    return res.json({ message: "Usuário removido com sucesso" });
  }
}
