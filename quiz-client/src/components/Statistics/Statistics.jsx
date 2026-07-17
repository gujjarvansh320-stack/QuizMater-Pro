import React from "react";
import "./Statistics.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const stats = [
    {
      number: 15000,
      suffix: "+",
      title: "Active Users",
    },
    {
      number: 5000,
      suffix: "+",
      title: "Quiz Questions",
    },
    {
      number: 120,
      suffix: "+",
      title: "Categories",
    },
    {
      number: 98,
      suffix: "%",
      title: "Success Rate",
    },
  ];

  return (
    <section className="statistics" ref={ref}>
      <div className="container">

        <div className="row">

          {stats.map((item, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="stat-card">

                <h2>
                  {inView && (
                    <CountUp
                      start={0}
                      end={item.number}
                      duration={2.5}
                    />
                  )}

                  {item.suffix}
                </h2>

                <p>{item.title}</p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Statistics;