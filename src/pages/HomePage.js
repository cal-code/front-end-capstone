import CallToAction from "../CallToAction";
import RestaurantFood from "../restaurantfood.jpg";
import GreekSalad from "../greek_salad.jpg";
import Bruschetta from "../bruschetta.svg";
import LemonDessert from "../lemon_dessert.jpg";

export default function HomePage() {
  return (
    <>
        <div className="call-to-action">
            <CallToAction />
            <img id="restaurant-pic" src={RestaurantFood} width={100} alt="Restaurant Food" />
        </div>
        <div className="specials-header">
            <h3>This week's specials!</h3>
            <button aria-label="View online menu">Online Menu</button>
        </div>
        <div className="specials">
            <article className="card">
                <img src={GreekSalad} width={100} alt="Greek Salad" />
                <h4>Greek Salad</h4>
                <p>The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                <span aria-label="Price: 12 dollars and 99 cents">$12.99</span>
            </article>
            <article className="card">
                <img src={Bruschetta} width={100} alt="Bruschetta" />
                <h4>Bruschetta</h4>
                <p>Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with fresh tomatoes, basil, and mozzarella.</p>
                <span aria-label="Price: 5 dollars and 99 cents">$5.99</span>
            </article>
            <article className="card">
                <img src={LemonDessert} width={100} alt="Lemon Dessert" />
                <h4>Lemon Dessert</h4>
                <p>This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
                <span aria-label="Price: 5 dollars">$5.00</span>
            </article>
        </div>
    </>
  )
}
