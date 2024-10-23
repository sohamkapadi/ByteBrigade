import React from "react";
import { FaChartLine, FaMoneyBillWave, FaBuilding, FaUserFriends } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
    const details = [
        {
            id: 1,
            title: "78,000+",
            subTitle: "Stocks Tracked",
            icon: <FaChartLine />,
        },
        {
            id: 2,
            title: "1,500+",
            subTitle: "Active Investors",
            icon: <FaMoneyBillWave />,
        },
        {
            id: 3,
            title: "200+",
            subTitle: "Market Insights",
            icon: <FaBuilding />,
        },
        {
            id: 4,
            title: "30,000+",
            subTitle: "Community Members",
            icon: <FaUserFriends />,
        },
    ];

    return (
        <div className="heroSection">
            <div className="container">
                <div className="title">
                    <h3>Welcome to Your Stock Market Companion</h3>
                    <b>Navigate the Indian Stock Market with Confidence</b>
                    <p>
                        Our platform empowers you to make informed investment decisions with real-time data, expert insights,
                        and a vibrant community. Whether you're a seasoned trader or a novice, we provide you with the tools 
                        and resources to enhance your trading experience. Join us in exploring the dynamic world of stocks 
                        and investments!
                    </p>
                </div>
                <div className="image">
                    <img src="/HeroSection.png" alt="hero" />
                </div>
            </div>
            <div className="details">
                {details.map(elements => {
                    return (
                        <div className="card" key={elements.id}>
                            <div className="icon">{elements.icon}</div>
                            <div className="content">
                                <p>{elements.title}</p>
                                <p>{elements.subTitle}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HeroSection;
