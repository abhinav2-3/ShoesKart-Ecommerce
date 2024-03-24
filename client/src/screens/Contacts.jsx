const Contacts = () => {
  const authUser = localStorage.getItem("authUser");
  const user = JSON.parse(authUser);
  return (
    <section className="contact">
      <div>
        <h1>Feel Free To Contact Us</h1>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28518.29196706732!2d80.96289053307136!3d26.68731000819765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf01c699a0c4f%3A0xeb5399e2cf58dc20!2sMohanlalganj%2C%20Uttar%20Pradesh%20226301!5e0!3m2!1sen!2sin!4v1700928150264!5m2!1sen!2sin"
            height="450"
            className="map"
            style={{ border: 0, width: "100vw" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="same-origin"
          ></iframe>
        </div>
        <form action="https://formspree.io/f/xeqbbenl" method="POST">
          <input
            type="text"
            name="Username"
            placeholder="UserName"
            value={user ? user.name : ""}
          />
          <input
            type="email"
            name="Email"
            placeholder="example@gmail.com"
            value={user ? user.email : ""}
          />
          <textarea
            cols="30"
            rows="6"
            placeholder="Enter your message"
            name="Message"
          ></textarea>
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
