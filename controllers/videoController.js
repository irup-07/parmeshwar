const express = require("express");
const Video = require("./../models/videoModel");
const validator = require("validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/productImage')
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `-product-Img${req.user._id}-${Date.now()}.${ext}`)
//   }
// })

// comment started parmeshwar
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please Upload only Image ", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single("photo")

exports.resizeProductImage = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `-product-Img-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 580)
    .toFormat("jpeg")
    .jpeg({
      quality: 90
    })
    .toFile(`public/img/productImage/${req.file.filename}`);
  next()
};

exports.getAllVideo = catchAsync(async (req, res, next) => {
  const video = await Video.find();
  if (!video) {
    return next(new AppError("No product found with this ID"));
  }
  res.status(200).json({
    status: "success",
    result: video.length,
    data: {
      video,
    },
  });
});

exports.getSingleVideo = catchAsync(async (req, res, next) => {
  const singleVideo = await Video.findById(req.params.id);

  if (!singleVideo) {
    return next(new AppError("No product found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
        singleVideo,
    },
  });
});

exports.addNewVideo = catchAsync(async (req, res, next) => {
  const newVideo = await Video.create({
    name: req.body.name,
    category: req.body.category,
    subcategory: req.body.subcategory,
    codeSnippet: req.body.codeSnippet,
    description: req.body.description,
    approvedBy: req.body.approvedBy,
    enableDisplay: req.body.enableDisplay,
    photo: req.file.filename,

  });
//  console.log(photo.length);
  res.status(201).json({
    status: "Success",
    data: {
      video: newVideo,
      
    },
  });
});

exports.updateVideo = catchAsync(async (req, res, next) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!video) {
    return next(new AppError("No product found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      video,
    },
  });
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return next(new AppError("No product found with this ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});