import "./Subscribe.css";
import images from "../../../Components/images";


const Subscribe = () => {

    const style = {
        backgroundImage: `url(${images.network})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <section className="subscribe d-flex align-center
    " style={style}>
        <h2>Subscribe to our newsletter</h2>
            <form>
              <input type="email" placeholder="Enter your email address" required />
              <button>Subscribe</button>
            </form>
       
      </section>
    );
}

export default Subscribe;