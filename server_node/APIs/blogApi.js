const exp = require("express");
const blogApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const path = require('path');
const getDBObj = require("./DBConnection");
const fs = require('fs');
const { v4: uuid } = require('uuid');

require("dotenv").config();

blogApp.use(exp.json({ extended: true }));
// Middleware to parse URL-encoded bodies
blogApp.use(exp.urlencoded({ extended: true }));

blogApp.post('/blog', expressAsyncHandler(async (req, res) => {
    let blogcollection = await getDBObj("blogCollection");
    try {
        console.log(req.files);
        let { title, category, description, authorname } = req.body;
        
        if (!title || !category || !authorname || !description || !req.files) {
            return res.send({ message: "Fill in all the fields and choose avatar and thumbnail" });
        }
        const { thumbnail, avatar } = req.files;

        if (thumbnail.size > 2000000 || avatar.size > 2000000) {
            return res.send({ message: "The image size is too big. File should be less than 2MB" });
        }

        let filenameT = thumbnail.name;
        let filenameA = avatar.name;

        let splittedFileNameT = filenameT.split('.');
        let newFilenameT = splittedFileNameT[0] + uuid() + "." + splittedFileNameT[splittedFileNameT.length - 1];
        
        let splittedFileNameA = filenameA.split('.');
        let newFilenameA = splittedFileNameA[0] + uuid() + "." + splittedFileNameA[splittedFileNameA.length - 1];
        
        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilenameT));
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilenameA));

        const newPost = await blogcollection.insertOne({
            title,
            category,
            description,
            authorname,
            thumbnail: newFilenameT,
            avatar: newFilenameA
        });

        console.log(newPost);
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).send({ message: "Error Occurred" });
    }
}));

module.exports = blogApp;
