import axios from 'axios';
import "./AdminCard.css";
import * as vacationsAction from "../../../redux/action";
import {Link} from 'react-router-dom'
import { useDispatch} from "react-redux";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

export interface IVacations {
    id: number;
    description: string;
    destination: string;
    picture: string;
    from_date: string;
    to_date: string;
    price: number;

}

function AdminCard(props: IVacations) : JSX.Element {
    const dispatch = useDispatch()
    const url = 'http://localhost:3001/upload/'

    const onDeleteVacationCard = () => {
        axios.delete(`http://localhost:3001/vacations/${props.id}` ).then(response => {
            if(response.status === 200){
                dispatch(vacationsAction.getVacationsData());
            }
        }).catch(e => {
            console.error(e);
            alert('Failed Customer data');
        })
    }

    function formatDate(date: any) {
        var thisDate = date.split("-");
        var newDate = [thisDate[2], thisDate[1], thisDate[0]].join("/");
        return newDate;
      }
    
    return (
        
            <div className="adminCard">
                <div className="adminButtons">
                    <Link to={`/editVacation/${props.id}`}>
                        <button><FaPencilAlt className="iconStyle"/></button>
                    </Link>
                   
                    <button onClick={onDeleteVacationCard}>
                        <FaTrash className="iconStyle"/>
                    </button>
                </div>
                
                <img src={`${url}${props.picture}`} alt="vacation" />
                <h2>{props.destination}</h2>
                <p className="vacationDescription">{props.description}</p>
                <p>{formatDate(props.from_date)}</p>
                <p>{formatDate(props.to_date)}</p>
                <p>Price: {props.price}$</p> 
                {/* <p>{props.followers}</p> */}
            </div>

       
    )
}

export default AdminCard
