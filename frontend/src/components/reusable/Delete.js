export default function Delete({
  httpRequester,
  setActive,
  item,
  setEditorOpen,
  onClose,
}) {
  const handleDelete = () => {
    httpRequester.submitRequest(item.url + "/delete", "POST", {
      uuid: item.uuid,
    });

    onClose();
  };

  return (
    <section>
      <p>
        Are you sure you want to delete your {item.type}?<span> </span>
        <button onClick={handleDelete} className="link-button">
          Yes
        </button>
        <span> | </span>
        <button onClick={() => onClose()} className="link-button">
          No
        </button>
      </p>
    </section>
  );
}
