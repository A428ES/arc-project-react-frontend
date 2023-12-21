import Comment from "./Comment";

export default function CommentDisplay({ item, httpRequester }) {
  return (
    <>
      <section>
        <Comment
          key={item.comment_uuid}
          httpRequester={httpRequester}
          item={item}
        />
      </section>
    </>
  );
}
