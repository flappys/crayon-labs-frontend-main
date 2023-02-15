import { useParams } from "react-router-dom";
import ApiService from "../../services/apiService";

function ArtRarity(props) {
    const dispatch = useDispatch()
    const [layerIndex, setLayerIndex] = useState(0);
    const [layersInfo, setLayersInfo] = useState([])
    const api = new ApiService()
    const params = useParams()
    return <div>

    </div>
}


export default ArtRarity;