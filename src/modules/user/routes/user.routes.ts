import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();
const userController = new UserController();

router.get("/", userController.index);
router.get("/average-age", userController.getAverageAgeByCity);
router.get("/:id", userController.show);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
