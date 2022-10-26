import React, { useState } from "react";

function StarRating ({ ratingScore, setRatingScore, clickable }) {

    const rate = (event) => {
        const targetScore = event.target.dataset.score
        if (!clickable || !targetScore) return;
        console.log(targetScore)
        setRatingScore(targetScore)
    
        if (targetScore) {
          // 별 눌렀을 때 (빈공간x)
          if (ratingScore > 0) {
            // 이미 줬던 점수가 있으면 -> 수정 (put)
              // axios({
              //   method: 'put',
              //   url: `${SERVER_URL}/movies/${this.selectedMovie.id}/rating/`,
              //   headers: { Authorization : `JWT ${localStorage.getItem('jwt')}`},
              //   data: { rate : targetScore },
              // })
              // .then(() => {
              //   this.updateRatingState()
              // })
              // .catch(err => {
              //   console.log(err)
              // })
            console.log()
    
          } else {
            // 준 점수가 없으면 -> 새로 등록 (post)
          //   axios({
          //     method: 'post',
          //     url: `${SERVER_URL}/movies/${this.selectedMovie.id}/rating/`,
          //     headers: { Authorization : `JWT ${localStorage.getItem('jwt')}`},
          //     data: { rate : targetScore },
          //   })
          //   .then(() => {
          //     this.updateRatingState() 
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
            console.log()
          }
        }
    }

    return (
        <section id="starRating">
        <label className="my-label">{'> '}별점</label><br></br>
        <span className="rating" onClick={rate}>
            {new Array(5).fill("").map((star_src, idx) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.07 20.23"
                className="star-rating-icon"
                data-score={Number(idx)+1} key={`star-${idx}`}>
                <g id="레이어_2" data-name="레이어 2">
                <g id="레이어_1-2" data-name="레이어 1">
                <path
                data-score={Number(idx)+1}
                className={`cls-1 ${ idx < ratingScore ? "full-star" : ""}`}
                d="M11.81,1.29l2,4.05a1.44,1.44,0,0,0,1.07.78l4.47.65a1.42,1.42,0,0,1,.79,2.43l-3.23,3.15a1.41,1.41,0,0,0-.41,1.26l.76,4.45a1.42,1.42,0,0,1-2.06,1.5l-4-2.1a1.42,1.42,0,0,0-1.33,0l-4,2.1a1.42,1.42,0,0,1-2.07-1.5l.77-4.45a1.47,1.47,0,0,0-.41-1.26L.93,9.2a1.43,1.43,0,0,1,.79-2.43l4.47-.65a1.44,1.44,0,0,0,1.07-.78l2-4A1.43,1.43,0,0,1,11.81,1.29Z"/></g></g>
            </svg>
            ))}
        </span>

    </section>
    );
}

export default StarRating;
