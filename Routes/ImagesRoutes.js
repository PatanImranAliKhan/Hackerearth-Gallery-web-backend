const express = require('express')

const ImageModel = require('../Models/ImageModel.js')

const ImageRouter = express.Router();
const multer = require('multer')

const { v4: uuidv4 } = require('uuid')


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${getRandomString()}_${file.originalname}`)
    }
})

function getRandomString() {
    const get_rdm = uuidv4();
    const id = get_rdm.split("-")[0];
    return id;
}

const upload = multer({ storage: storage })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ImageRouter.post('/', upload.single('file'), async (req, res, next) => {

    if (!req.file || req.file == undefined || req.file == null) {
        res.setHeader('Content-Type', 'application/json');
        res.send({ "Message": "Image is Required" });
        next()
    }
    else {
        const data = req.body;

        console.log(req.file.filename || "");

        const imageurl = `/uploads/${req.file.filename}`;
        await sleep(2000);
        console.log(imageurl);
        const obj = {
            userEmail: data.email,
            ImgName: data.imageName,
            ImgUrl: imageurl,
            ImgDetails: data.imageDetails
        }
        const image = new ImageModel(obj);
        image.save()
            .then((resp) => {
                res.setHeader('Content-Type', 'application/json');
                res.send({ "Message": "success" })
            })
            .catch((err) => {
                res.setHeader('Content-Type', 'application/json');
                res.send({ "Message": "error" });
            })
    }
});

ImageRouter.get('/getall', (req, res, next) => {
    ImageModel.find({})
        .then((resp) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(resp);
        })
        .catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": "error" });
        })
})

ImageRouter.get('/getuser/:email', (req, res, next) => {
    const data = String(req.params.email)
    const email = data.slice(1, -1);
    ImageModel.find({ userEmail: email })
        .then((resp) => {
            // console.log(resp);
            res.setHeader('Content-Type', 'application/json');
            res.send(resp);
        })
        .catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": "error" });
        })
})

ImageRouter.get('/show/:id', (req, res, next) => {
    ImageModel.findById(req.params.id)
        .then((resp) => {
            // console.log(resp);
            res.setHeader('Content-Type', 'application/json');
            res.send(resp);
        })
        .catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": err });
        })
})

ImageRouter.put('/:id/edit', upload.single('file'), async (req, res, next) => {
    console.log("edit ", req.body);
    if (!req.file || req.file == undefined || req.file == null) {
        res.setHeader('Content-Type', 'application/json');
        res.send({ "Message": "Image is Required" });
        next()
    }
    else {
        const data = req.body;

        console.log(req.file.filename || "");

        const imageurl = `/uploads/${req.file.filename}`;
        await sleep(2000);
        console.log(imageurl);
        const obj = {
            ImgUrl: imageurl,
            ImgDetails: data.imageDetails
        }
        ImageModel.findByIdAndUpdate(req.params.id, { $set: obj }, { new: true })
            .then((resp) => {
                console.log("edit iamge = ", resp);
                res.setHeader('Content-Type', 'application/json');
                res.send({ "Message": "success" });
            })
            .catch((err) => {
                res.setHeader('Content-Type', 'application/json');
                res.send({ "Message": err });
            })
    }
})

ImageRouter.put('/:id/editdetails', (req, res, next) => {
    const data = req.body;
    const obj = {
        ImgDetails: data.imageDetails
    }
    ImageModel.findByIdAndUpdate(req.params.id, { $set: obj }, { new: true })
        .then((resp) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": "success" });
        })
        .catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": err });
        })
})

ImageRouter.delete('/delete/:id', (req, res, next) => {
    ImageModel.findByIdAndDelete(req.params.id)
        .then((resp) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": "success" });
        })
        .catch((err) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ "Message": err });
        })
})

module.exports = ImageRouter