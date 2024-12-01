let cropmodel=require('./../models/cropmodel')
let catchasync=require('./../utils/catchasync')
exports.getallcrop = catchasync(async (req, res) => {
 let {city}=req.query
 let query={};
 if(city){
  query.city=city
 }
 const price = await cropmodel.find(query);
    res.status(201).json({
      status: 'success',
      data: price
    });

});

exports.createcrop=catchasync(async(req,res)=>{
    const price = await cropmodel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: price
    });
        
    })
    exports.getcrop=catchasync(async(req,res)=>{
        const price = await cropmodel.findById(req.params.id);
        res.status(201).json({
          status: 'success',
          data: price
        });
            
        })
        exports.updatecrop=catchasync(async(req,res)=>{
            const price = await cropmodel.findByIdAndUpdate(req.body,req.params.id,{
                new:true
            });
            res.status(201).json({
              status: 'success',
              data: price
            });
                
            })
            exports.dltcrop=catchasync(async(req,res)=>{
                const price = await cropmodel.findByIdAndDelete(req.params.id);
                res.status(201).json({
                  status: 'success',
                  data: price
                });
                    
                })
                exports.alldeletecrop=catchasync(async(req,res)=>{
                  await cropmodel.deleteMany({})
                    res.status(200).json({
                      status: 'success',
                      data: null
                    });
                        
                    })