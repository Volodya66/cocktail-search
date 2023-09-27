import axios from 'axios';

const BASE_URL = "https://drinkify.b.goit.study/api/v1";
// let widthWindowUser = document.documentElement.clientWidth;
// if (widthWindowUser) {
//     console.log('object')
// }

export default async function firstReqAPI(param) {
console.log(param)

try { 
    let response = await axios.get(`${BASE_URL}/cocktails/?r=${param}`); 
    //     console.log(response)  
    // console.log("data",response.data)    
    return  response.data;
}
    
catch {
        console.error(error.message)
    }
};
