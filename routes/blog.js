const {Router} = require('express')
const router = Router();

// Adding multer to upload the file 
const multer = require('multer')
const path = require('path')
//  *** //

const Blog = require('../models/blog');

//  uploading the file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })

  const upload = multer({ storage: storage })

//    **** //

router.get("/add-new-blog", (req,res) => {
    return res.render("addBlog",{
        user : req.user,
    });
});


// To save the blog in mongodb
router.post("/", upload.single("coverImage"), async (req,res) => {
    console.log(req.body);
    console.log(req.file)

    const {title, body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
})
// *** //


module.exports = router;