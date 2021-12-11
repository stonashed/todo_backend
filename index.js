import express from 'express'
import mongoose from 'mongoose';
import TodoModel  from'./schema/todo_schema.js'

const app = express ();
app.use(express.json())

mongoose.connect(
     'mongodb+srv://stone2020:STonash2014@cluster0.ni6tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
         useUnifiedTopology:true }).then(()=>{
             console.log('connect to mongoDB successful')
             }).catch((err)=>{console.log(err)})


 app.get ('/todos',async(req,res) =>{
     try {
         const todos = await TodoModel.find({});
         return res.status(200).json({
             status: true,
             message: 'Todos fetched successfully',
             data: todos
         })
         
     } catch (error) {
       console.log('Something went wrong',error)  
       res.status(400).send ('fail to fetch todos', error)     }
 })
 //
 app.post('/todos',  async(req, res)=>{
     try {
         
        const newTodo = await TodoModel.create({...req.body})
        res.status(201).json({
            status: true,
            message: 'Todo is created successfully',
            data: newTodo
        })
     } catch (error) {
         console.log('something went wrong', error);
        // res.status(400).send('failed to fetch todos', error)
         
     }
     })

      app.delete('/todos/:id',async(req,res)=>{
          try {
              const{id}=req.params;
              const deleteTodo =await TodoModel.findByIdAndDelete(id);
              return res.status(201).json({
                  message: "Todo deleted Successfully"
              })
              
          } catch (error) {
              console.log("something went wrong", error)
              
          }
      })
    



app.listen(5000)