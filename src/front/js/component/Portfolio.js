import React from "react";


const Portfolio = () => {
  return (
    <div id="Portfolio" className="container bg-transparent border-end-0 border-start-0 border-top border-bottom border mx-auto py-5">
      <h1>Set & Track your Goals for Success</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries,
      </p>
      <div className="container">
        <div className="row">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            <div className="col">
              <div className="card h-100">
                <img src="https://i.pinimg.com/564x/d6/e9/81/d6e981685b2f74ec5331662d08a468e6.jpgg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Set Screen Productivity Goals</h5>
                  <p className="card-text">
                    Be on top of thing by setting screen time goals! Stop wasting your time on unknown scrolling or watching useless videos.

                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="https://th.bing.com/th/id/OIP.jmXcSoWQ1tRTh3T_eRoG-AHaEK?pid=ImgDet&w=194&h=109.07630522088354&c=7&dpr=2" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Track your screen time</h5>
                  <p className="card-text">
                    Improve your efficency by tracking your screen time and learning about your habits
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="https://th.bing.com/th/id/OIP.PzZ_10yRG1S3z-qz2Z9X7gHaE7?pid=ImgDet&w=194&h=129.33333333333331&c=7&dpr=2" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Connect with friends</h5>
                  <p className="card-text">
                    Don’t work in silence share your progress with friends and family!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;