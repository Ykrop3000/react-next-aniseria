import React from "react";
import CommentCard from "components/cards/listCards/commentCard";
import { fetchComments } from "src/api";

export default function SiteBar({ topic_id }) {
  const [comments, setComments] = React.useState([]);
  React.useEffect(async () => {
    const { data } = await fetchComments({ commentable_id: topic_id });
    console.log(data);
    setComments(data);
  }, [setComments]);

  return (
    <>
      {comments.map((i, id) => (
        <CommentCard key={id} data={i} />
      ))}
    </>
  );
}
