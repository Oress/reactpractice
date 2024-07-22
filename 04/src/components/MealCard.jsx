import Button from './Button';
import {getImageUrl} from '../utils/httputils';

export default function MealCard({data, onAddToCart}) {

    const imgUrl = getImageUrl(data.image);

    return (
        <div className="meal-item">
            <img src={imgUrl} alt="Image" />
            <h3 className="">{data.name}</h3>
            <h3 className='meal-item-price'>${data.price}</h3>

            <p className='meal-item-description'>{data.description}</p>
            <div className="meal-item-actions">
                <Button onClick={onAddToCart}>Add to Cart</Button>
            </div>
        </div>
    );
}