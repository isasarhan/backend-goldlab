const asyncHandler = require('express-async-handler');
const { Supplier, validateSupplier } = require('../models/Supplier');

const getAllSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  })
const addSupplier = asyncHandler(async(req,res)=>{
    const {error} = validateSupplier(req.body)
    if(error) return res.send(error.details[0].message)

    const supplier = new Supplier({
        name:req.body.name,
        cash:req.body.cash,
        weight:req.body.weight,
        description:req.body.description,
    })
    const result = await supplier.save()
    if(!result) return res.send("error saving supplier").status(400)
    res.json(result)
})
const getSupplierById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const supplier = await Supplier.findById(id);
    if (!supplier) return res.send("supplier not found");
    res.json(supplier).status(200);
  });
  const deleteSupplierById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) return res.send("supplier not found");
    res.json(supplier);
  });

  const updateSupplier = asyncHandler(async (req, res) => {
      const id = req.params.id
      const { error } = validateSupplier(req.body);
      if (error) return res.send(error.details[0].message);
      const updated = await Supplier.findByIdAndUpdate(id,{
          weight:req.body.weight,
          cash:req.body.cash,
          name:req.body.name,
          description:req.body.description
      }, {new:true})
      if(!updated) return res.send("error updating supplier").status(400)
      res.json(updated)
    })

  module.exports = {getAllSuppliers,getSupplierById, addSupplier,updateSupplier,deleteSupplierById}