"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateTaskInput_1 = require("../middlewares/validateTaskInput");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/', validateTaskInput_1.validateTaskInput, taskController_1.createTask);
router.get('/', taskController_1.getTasks);
router.get('/:id', taskController_1.getTaskById);
router.put('/:id', validateTaskInput_1.validateTaskInput, taskController_1.updateTask);
router.delete('/:id', taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map