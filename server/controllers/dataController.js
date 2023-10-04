const Data = require('../models/dataModel');

const dataController = {};

dataController.getData = async (req, res, next) => {
  try{
    const data = await Data.find({userId: res.locals.userId});
    res.locals.data = data;
    return next();
  }
  catch(err){
    return next(err);
  }
}

dataController.addData = async (req, res, next) => {
  const {id, name, amount, date} = req.body;
  try{
    await Data.findOneAndUpdate({_id: id}, {Name: name, Date: date, Amount: amount}, {upsert: true});
  }
  catch (err){
    return next(err);
  }
}

dataController.deleteData = async(req, res, next) => {
  const {id} = req.body;
  if(!id) return next('error: include id for deletion')
  try{
    await Data.findOneAndDelete({_id, id});
  }
  catch (err){
    return next(err);
  }
}



module.exports = dataController;