export default function DeleteComment({
  httpRequester,
  commentUUID,
  setActive,
}) {
  let handleDelete = () => {
    httpRequester.submitRequest("comments/delete", "POST", {
      uuid: commentUUID,
    });
  };

  return (
    <section>
      Are you sure you want to delete your comment?{" "}
      <a href="javascript:void(0)" onClick={() => handleDelete()}>
        Yes
      </a>{" "}
      |{" "}
      <a
        href="javascript:void(0)"
        onClick={() => {
          setActive(false);
        }}
      >
        No
      </a>
    </section>
  );
}
