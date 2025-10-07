import React from "react";
import "./index.css";

const FloatFigures = () => {
  return (
    <div id="wd-float-divs">
      <p><strong>Figure 2.1.17.a - Floating Images and Content with CSS</strong></p>
      <div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>

        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>

        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>

        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius hic ipsum consequatur saepe, laudantium quasi quae perspiciatis quas maxime error tenetur repudiandae necessitatibus variatis obcaecat quisquam at iisque a?
        </p>

        <div className="wd-float-done"></div>
      </div>

      
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
};

export default FloatFigures;
