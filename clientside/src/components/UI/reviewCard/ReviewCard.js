import React from 'react';

const ReviewCard = () => {
    return (
        <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="row">
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                className="rounded-circle shadow-1 mb-4 mb-lg-0"
                alt="woman avatar"
                width="150"
                height="150"
              />
            </div>
            <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
              <h4 className="mb-4">
                Maria Smantha - Web Developer
              </h4>
              <p className="mb-0 pb-3">
                Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. A aliquam amet animi
                blanditiis consequatur debitis dicta
                distinctio, enim error eum iste libero
                modi nam natus perferendis possimus
                quasi sint sit tempora voluptatem. Est,
                exercitationem id ipsa ipsum laboriosam
                perferendis.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ReviewCard;