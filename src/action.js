
import axios from 'axios';
export const fetch_request =  'fetch_request'
export const fetch_success =  'fetch_success'
export const fetch_failure =  'fetch_failure'
export const update_employee =  'update_employee'
export const delete_employee =  'delete_employee'
export const add_employee = 'add_employee'; 



export const fetchrequest =() =>({
  type: fetch_request
})

export const fetchsuccess =(data) =>({
    type: fetch_success,
    payload: data
})

  export const fetchfailure =(error) =>({
    type: fetch_failure,
    payload: error
})

export const empupdate = (id, newData) => ({
  type: update_employee,
  payload: { id, newData }
});

export const empdelete = (id) => ({
  type: delete_employee,
  payload: id
});

export const addEmployee = (employeeData) => ({ 
  type: add_employee,
  payload: employeeData,
});


export const fetchData = ()=>{

   return async dispatch => {
     dispatch(fetchrequest());
     try {

        let response = await axios.get('http://localhost:3001/employee')
        console.log(response.data);

        if(!response.data){
            throw new Error("failed to fetch todo")
        }

        const data  = await response.data;
        dispatch(fetchsuccess(data));
        
    } catch (error) {
        console.log(error);
        dispatch(fetchfailure(error));

    }
   }   
  }

