const About = () => {
  return (
    <div className="container py-5">

      <h1 className="text-center mb-4">
        About QuizMaster
      </h1>

      <p className="lead text-center mb-5">
        QuizMaster is a modern online quiz platform designed to help users
        improve their programming knowledge through interactive quizzes,
        instant results, ratings, and leaderboards.
      </p>

      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3>🎯 Our Mission</h3>
            <p>
              Our mission is to make learning programming engaging and
              enjoyable by providing quizzes across multiple technologies.
              Whether you're a beginner or an experienced developer,
              QuizMaster helps you test and strengthen your skills.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h3>🚀 Features</h3>
            <ul>
              <li>User Authentication</li>
              <li>Email Verification & Password Reset</li>
              <li>Category-Based Quizzes</li>
              <li>Randomized Questions</li>
              <li>Instant Quiz Results</li>
              <li>User Rating System</li>
              <li>Leaderboard</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="card shadow p-4 mt-4">

        <h3>💻 Technologies Used</h3>

        <div className="row mt-3">

          <div className="col-md-3">
            <h5>Frontend</h5>
            <p>React.js, Bootstrap, Axios</p>
          </div>

          <div className="col-md-3">
            <h5>Backend</h5>
            <p>Node.js, Express.js</p>
          </div>

          <div className="col-md-3">
            <h5>Database</h5>
            <p>MongoDB</p>
          </div>

          <div className="col-md-3">
            <h5>Authentication</h5>
            <p>JWT & Nodemailer</p>
          </div>

        </div>

      </div>

      <div className="text-center mt-5">

        <h3>⭐ Why Choose QuizMaster?</h3>

        <p className="mt-3">
          Practice coding concepts through real interview-style questions,
          monitor your performance with detailed results, earn ratings,
          and compete with other learners on the leaderboard.
        </p>

      </div>

    </div>
  );
};

export default About;