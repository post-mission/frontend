import React from "react";
import StarRating from "./StarRating";

function TicketDetailReview({ summary, rating, description, user_images }) {
  return (
    <article className="ticket-detail-review">
      <StarRating ratingScore={rating} clickable={false} />

      <section>
        <p className="ticket-detail-review__summary-wrapper">
          <label>{'> '} 한줄 요약:</label>
          <span>{summary}</span>
        </p>
      </section>

      <section className="ticket-detail-review__description-wrapper">
        <label>{'> '} 후기</label>
        {description.split("\n").map((p, i) => (<p key={`paragraph-${i+1}`}>{p}</p>))}
      </section>

      <section className="ticket-detail-review__user-images-wrapper">
        {user_images ? user_images.map((img, i) => (
          <img className="ticket-detail-review__user-image" 
            src={img} alt={`user-img-${i+1}`}      //수정 필요
            key={`user-img-${i+1}`} />)) : ""}
      </section>

      
    </article>
  );
}

export default TicketDetailReview;
