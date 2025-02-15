import { Button } from "react-bootstrap"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import ExpenseBillService from "../services/ExpenseBillService";
import axios from "axios";


const ExpensebillForm = () => {

   const[particulars,setparticulars] = useState("");
   const[amount,setamount] = useState("");
   const[sta_tus,setsta_tus] = useState("");
   const[extensionNo,setextensionNo] = useState("");
   const[expense,setexpense] = useState("2")

   const [file, setfile] = useState(null);

   const navigate = useNavigate();
   const {id} = useParams();


   const saveOrUpdateExpenseBill = (e) => {


    e.preventDefault();
    const expenseBill = {extensionNo,particulars, amount, sta_tus, expense}
    

    if(id){
         ExpenseBillService.updateExpenseBill(expenseBill,id)
        .then(
            (response) => {

            console.log(response.data)    
            navigate('/expense')
        }
        )
        .catch(
            error => {
            console.log(error)
        }
        )

    }else{
     ExpenseBillService.createExpenseBill(expenseBill)
        .then(
            (response) =>{
            
                console.log("hey")
            console.log(response.data)

            navigate('/expense');

        }
        )
        .catch(
            error => {
            console.log(error)
        }
        )
    }
    }

    useEffect(() => {
       
        ExpenseBillService.getExpenseBillById(id)
               .then(
                   (response)=>{
                       console.log(response.data.payload[0]);
                       
                       setextensionNo(response.data.payload[0].extensionNo)
                       setparticulars(response.data.payload[0].particulars)
                       setamount(response.data.payload[0].amount)
                       setsta_tus(response.data.payload[0].sta_tus)
                       setexpense(response.data.payload[0].expense)
                    
                   }
               )
               .catch(
                   (error)=>{
                        console.log(error)
                   }
               )
   
              
           
       }, [])

    const title = ()=>{
        if(id){
                return <h2 >Update Expense Bill</h2>
        }else{
               return <h2>Add Expense Bill</h2>
        }
      }

     const handleFileSelect = (event) =>{

        setfile(event.target.files[0])

      }

      const handleSubmit = (event) =>{
         
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        console.log('test1');
        try {
          const response = axios.post("http://localhost:8080/upload-expense-bill",
          
          formData
          )
          .then(()=>{
              console.log('hi');
          })
        } catch(error) {
          console.log(error)
        }

      }

    return ( 

        <div>

             {title()}

              <form>

              <div>
                                 <label > ExtensionNo :</label>
                                 <input
                                     type = "text"
                                     placeholder = "Enter extensionNo"
                                     name = "extensionNo"
                                     value = {extensionNo}
                                     onChange = {(e) => setextensionNo(e.target.value)}
                                 >
                                 </input>
             </div>

              <div>
                                 <label > Particulars :</label>
                                 <input
                                     type = "text"
                                     placeholder = "Enter particulars"
                                     name = "particulars"
                                     value = {particulars}
                                     onChange = {(e) => setparticulars(e.target.value)}
                                 >
                                 </input>
             </div>

             <div>
                                 <label > Amount :</label>
                                 <input
                                     type = "text"
                                     placeholder = "Enter amount"
                                     name = "amount"
                                     value = {amount}
                                     onChange = {(e) => setamount(e.target.value)}
                                 >
                                 </input>
             </div>
             <div>
             <input type="file" onChange={handleFileSelect}/>
             </div>
             <br / >
             <br / >
        
             <div>
             <Button onClick={
                 (e)=>{
                     
                     saveOrUpdateExpenseBill(e);
                     handleSubmit(e);
                    }
                 } variant='warning' size="lg">Submit</Button>
             </div>
             <br />                      
            

              </form>


        </div>

     );
}
 
export default ExpensebillForm;