const express = require('express')
const ExtractModel = require('../Models/ExtractFileModel')
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { PDFDocument } = require('pdf-lib');
const path = require('path');







const ExtractRouter = express.Router()


ExtractRouter.post('/generate-pdf/:path/:token/:id', async (req, res) => {
    const selectedPages = req.body.selectedPages;
    const paths=req.params.path
    console.log('why', JSON.stringify(paths));
    console.log('hello',selectedPages);
    const existingPdfPath = `./files/${paths}`; // Set the path to your existing PDF
  
  
  
    try {
      const existingPdfBytes = await fs.readFile(existingPdfPath);
  
      console.log('mmm',existingPdfBytes);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      console.log('hhh',pdfDoc);
  
  
  
      const newPdfDoc = await PDFDocument.create();
  
      console.log('ccc',newPdfDoc);
  
  
  
      for (const pageNumber of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        newPdfDoc.addPage(copiedPage);
      }
      console.log('ddd',newPdfDoc);
  
  
      const newPdfBytes = await newPdfDoc.save();
      const uniqueId = uuidv4(); // Generate a unique identifier
  
      await ExtractModel.create({  pdf: `new_${uniqueId}.pdf`,token:req.params.token,loginid:req.params.id });
  
  
  
      const newPdfPath = path.join('./files', `new_${uniqueId}.pdf`); // Set the path to save the new PDF
  
      await fs.writeFile(newPdfPath, newPdfBytes);
  
      res.send({ status: 'ok', newPath: newPdfPath });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });


  ExtractRouter.get("/Recentlygetextracted-files/:token", async (req, res) => {
    try {
        ExtractModel.find({token:req.params.token}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });

  ExtractRouter.get("/Allgetextracted-files/:id", async (req, res) => {
    try {
        ExtractModel.find({loginid:req.params.id}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });









module.exports = ExtractRouter





