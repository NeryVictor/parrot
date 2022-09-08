import { AppError } from "./helpers/AppErrors";
import { authMiddleware } from "./middlewares/authMiddleware";
import { authController } from "./controllers/authController";
import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const routes = Router();

routes.get("/", (req, res) => {
  throw new AppError("Error message", 400);
});

routes.post("/login", new authController().login); // Login
routes.post("/register", new UserController().create); // Registro de Usuário

routes.use(authMiddleware);

routes.get("/profiles", new UserController().index); // Listar Usuários
routes.get("/profile", new authController().getProfile); // Perfil Autenticado
routes.get("/profile/:id", new UserController().show); // Perfil de Usuário
routes.put("/profile/edit", new UserController().update); // Edição de Usuário
routes.delete("/profile/delete", new UserController().delete); // Remoção de Usuário

routes.get("/feed", new PostController().index); // Feed de Posts
routes.get("/profile/:userId/feed", new PostController().show); // Feed de Posts de Usuário
routes.post("/profile/:userId/feed/new", new PostController().create); // Criação de Post
routes.delete(
  "/profile/:userId/post/:postId/remove", // Remoção de Post
  new PostController().delete
);

export default routes;
