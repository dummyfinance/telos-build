import { useEffect, useState } from "react";
import CategoryView from "./CategoryView";
import ScrollShowbarView from "./ScrollShowbarView";
import { Link } from "react-router-dom";
import dummyPic from "../assets/pg1.jpg";

export default function HomeView(props) {
  const PRECISION = 10 ** 18;
  const [stats, setStats] = useState({
    projects: 0,
    fundings: 0,
    contributors: 0,
  });
  const [featuredRcmd, setFeaturedRcmd] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const getAllProjects = async () => {
    try {
      let res = await props.contract.getAllProjectsDetail().then((res) => {
        let tmp = [];
        let amount = 0,
          contrib = 0;
        for (const index in res) {
          let {
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
          } = { ...res[index] };
          tmp.push({
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            index,
          });
          amount += Number(amountRaised / PRECISION);
          contrib += Number(totalContributors);
        }
        setStats({
          projects: tmp.length,
          fundings: amount,
          contributors: contrib,
        });
        return tmp;
      });
      res.sort((a, b) => {
        return b.totalContributors * 1 - a.totalContributors * 1;
      });
      setFeaturedRcmd(res.slice(0, 4));
      setRecentUploads(res.slice(4, 24));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const renderRecommendations = (val) => {
    return val.map((project, index) => {
      return (
        <div className="recommendationCard" key={index}>
          <Link to="/project" state={{ index: project.index }}>
            <div
              className="rcmdCardImg"
              style={{
                backgroundImage: project.cid
                  ? `url(${"https://" + project.cid})`
                  : dummyPic,
              }}
            ></div>
          </Link>
          <div className="rcmdCardDetails">
            <div className="rcmdCardHeading">
              <Link to="/project" state={{ index: project.index }}>
                {project.projectName}
              </Link>
            </div>
            <div className="rcmdCardFundedPercentage">
              {((project.amountRaised / project.fundingGoal) * 100).toFixed(2) +
                "% Funded"}
            </div>
            <div className="rcmdCardAuthor">{"By " + project.creatorName}</div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <CategoryView isHome={true} />
      {/* siteStats */}
      <div className="siteStats">
      <br></br>
        <div className="tagLine">
        The telos of an acorn is to become an oak tree” 
          <br></br>
          - Aristotle
        </div>
        <br></br>
        <div className="divider">PLATFORM STATISTICS</div>
        <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#571aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          </div>
          <div className="stat-title">Projects</div>
          <div className="stat-value">{stats.projects}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#571aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="stat-title">FUNDED</div>
          <div className="stat-value">{stats.fundings + " TELOS"}</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#571aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div className="stat-title">BACKINGS</div>
          <div className="stat-value">{stats.contributors}</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>
      </div>

      {featuredRcmd.length !== 0 ? (
        <div className="suggestions">
          <div className="suggLeftContainer">
            <div className="featuredCard">
              <div className="featuredHeading">FEATURED PROJECT</div>
              <Link to="/project" state={{ index: featuredRcmd[0].index }}>
                <div
                  className="featuredCardProjectImg"
                  style={{
                    backgroundImage: featuredRcmd[0].cid
                      ? `url(${"https://" + featuredRcmd[0].cid})`
                      : dummyPic,
                  }}
                ></div>
              </Link>
              <div className="featuredProjectHeading">
                <Link to="/project" state={{ index: featuredRcmd[0].index }}>
                  {featuredRcmd[0].projectName}
                </Link>
              </div>
              <div className="featuredProjectDescription">
                {featuredRcmd[0].projectDescription}
              </div>
              <div className="featuredProjectAuthor">
                {"By " + featuredRcmd[0].creatorName}
              </div>
            </div>
          </div>
          <div className="suggRightContainer">
            <div className="recommendationList">
              <div className="recommendationHeading">RECOMMENDED FOR YOU</div>
              {renderRecommendations(featuredRcmd.slice(1, 4))}
            </div>
          </div>
        </div>
      ) : (
        <div className="noProjects">No projects found</div>
      )}
      <ScrollShowbarView
        recentUploads={recentUploads}
        heading={"NEW PROPOSALS"}
        emptyMessage={"No recent proposals"}
      />
    </>
  );
}
