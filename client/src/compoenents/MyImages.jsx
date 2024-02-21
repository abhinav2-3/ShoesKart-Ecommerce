import React, { useState } from "react";

const MyImages = ({ image, name }) => {
  const [mainImage, setMainImage] = useState(image[0]);

  return (
    <section className="myImages">
      <div>
        {image.map((item, idx) => {
          return (
            <figure key={idx}>
              <img
                src={item}
                alt={name}
                key={idx}
                onClick={() => setMainImage(item)}
                onMouseEnter={() => setMainImage(item)}
              />
            </figure>
          );
        })}
      </div>
      <aside>
        <img src={mainImage} alt={name} />
      </aside>
    </section>
  );
};

export default MyImages;
