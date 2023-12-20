export default function Delete({ httpRequester, setActive, item }) {
  const handleDelete = () => {
    httpRequester.submitRequest(item.url + "/delete", "POST", {
      uuid: item.uuid,
    });
  };

  return (
    <section>
      <p>
        Are you sure you want to delete your {item.type}?<span> </span>
        <button onClick={handleDelete} className="link-button">
          Yes
        </button>
        <span> | </span>
        <button onClick={() => setActive(false)} className="link-button">
          No
        </button>
      </p>
    </section>
  );
}
