const DeleteImageAndVideo = require("../../services/CRUD/Delete/DeleteImageAndVideo");

const deleteImageAndVideo = async (req, res) => {
    console.log('đã vào xóa ảnh');
    console.log(req.body.imageAndVideoId)
    try {
        if (req.user.userId !== req.body.userId) return res.status(200).json(new Error({ message: 'fail' }));
        console.log('đã vào xóa ảnh 2 ');
        const err = await DeleteImageAndVideo([req.body.imageAndVideoId]);
        console.log('xóa thành công');
        if (err) return res.status(200).json(new Error({ message: 'fail' }));
        else return res.status(200).json(1);
    } catch (error) {
        console.error(error);
        return res.status(200).json(new Error({ message: 'fail' }));
    }
}
module.exports = deleteImageAndVideo; 