const Router = require("express");
const router = new Router();
const noticeController = require("../controller/notice.controller");
router.post("/notice", noticeController.createNotice);
router.get("/notice/:id", noticeController.getNoticeByUser);
router.patch("/notice", noticeController.updateNotice);
router.delete("/notice/:id", noticeController.deleteNotice);
module.exports = router;
