export default function DeleteComment({
  httpRequester,
  commentUUID,
  setActive,
}) {
  const handleDelete = () => {
    httpRequester.submitRequest("comments/delete", "POST", {
      uuid: commentUUID,
    });
  };

  return (
    <section>
      <p>
        Are you sure you want to delete your comment?
        <span> </span>
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
