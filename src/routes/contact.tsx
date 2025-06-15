const Contact = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-5">
      <h1 className="text-3xl font-bold mb-3 text-center">Contact Us</h1>

      <form
        action="mailto:yourname@example.com"
        method="POST"
        encType="text/plain"
        className="space-y-3 bg-white p-6 shadow rounded-lg"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="Message"
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Send via Email App
        </button>
      </form>
    </div>
  );
};

export default Contact;
