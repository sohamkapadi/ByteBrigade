// src/pages/EducationPage.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import Quiz from './Quiz'; // Import the Quiz component
import { FaChartLine, FaMoneyBillWave, FaBullhorn, FaSearchDollar, FaPercentage, FaMoneyCheckAlt, FaExchangeAlt, FaUserShield, FaChartBar, FaClipboardList, FaBook, FaWallet } from 'react-icons/fa';
import './Education.css';

// Sample data
const articles = [
    {
        title: "Understanding the Stock Market",
        description: "An overview of stock markets, their purpose, and how they operate.",
        link: "https://www.investopedia.com/terms/s/stockmarket.asp"
    },
    {
        title: "Investing 101: A Beginner's Guide",
        description: "Learn the basics of investing, setting goals, and creating a plan.",
        link: "https://www.nerdwallet.com/article/investing/investing-101"
    },
    {
        title: "Fundamental vs. Technical Analysis",
        description: "Explore two primary methods of analyzing stocks and making investment decisions.",
        link: "https://www.investopedia.com/ask/answers/difference-between-fundamental-and-technical-analysis/"
    }
];

const videos = [
    {
        title: "How to Start Investing",
        url: "https://www.youtube.com/watch?v=cnjnJYr-8dk",
        thumbnail: "/invest.png"
    },
    {
        title: "Understanding Financial Statements",
        url: "https://www.youtube.com/watch?v=mnJDA3YXL9g",
        thumbnail: "/statement.png"
    },
    {
        title: "Stock Market Basics",
        url: "https://www.youtube.com/watch?app=desktop&v=b0_CsTFjtus",
        thumbnail: "/basics.png"
    }
];

const glossaryTerms = [
    { term: "Stock", definition: "A share in the ownership of a company.", icon: <FaChartLine /> },
    { term: "ETF", definition: "Exchange-Traded Fund, a type of investment fund.", icon: <FaMoneyBillWave /> },
    { term: "Dividend", definition: "A portion of a company's earnings distributed to shareholders.", icon: <FaBullhorn /> },
    { term: "Bull Market", definition: "A market condition where prices are rising.", icon: <FaSearchDollar /> },
    { term: "Bear Market", definition: "A market condition where prices are falling.", icon: <FaPercentage /> },
    { term: "Market Cap", definition: "The total value of a company's outstanding shares.", icon: <FaMoneyCheckAlt /> },
    { term: "Liquidity", definition: "The ease of converting an asset into cash.", icon: <FaExchangeAlt /> },
    { term: "Portfolio", definition: "A collection of financial investments.", icon: <FaUserShield /> },
    { term: "Volatility", definition: "A statistical measure of the dispersion of returns for a given security.", icon: <FaChartBar /> },
    { term: "Asset", definition: "Any resource owned by an individual or entity.", icon: <FaClipboardList /> },
    { term: "Broker", definition: "A person or firm that executes buy and sell orders.", icon: <FaBook /> },
    { term: "Futures", definition: "A financial contract obligating the buyer to purchase an asset at a predetermined price.", icon: <FaWallet /> }
];

const recommendedBooks = [
    {
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        cover: "/book1.png",
        downloadLink: "#"
    },
    {
        title: "A Random Walk Down Wall Street",
        author: "Burton Malkiel",
        cover: "/book2.png",
        downloadLink: "#"
    },
    {
        title: "The Little Book of Common Sense Investing",
        author: "John C. Bogle",
        cover: "/book3.png",
        downloadLink: "#"
    }
];

const EducationPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [quizModalIsOpen, setQuizModalIsOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const openModal = (url) => {
        setVideoUrl(url);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setVideoUrl("");
    };

    const openQuizModal = () => {
        setQuizModalIsOpen(true);
    };

    const closeQuizModal = () => {
        setQuizModalIsOpen(false);
    };

    return (
        <div className="education-page">
            <h1 className="page-title">Education</h1>
            <h2 className="page-subtitle">Learn About the Stock Market</h2>

            <section className="articles">
                <h2>Educational Articles</h2>
                <div className="article-list">
                    {articles.map((article, index) => (
                        <div className="article-card" key={index}>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <a href={article.link}>Read More</a>
                        </div>
                    ))}
                </div>
                <hr />
            </section>

            <section className="videos">
                <h2>Video Tutorials</h2>
                <div className="video-list">
                    {videos.map((video, index) => (
                        <div className="video-card" key={index} onClick={() => openModal(video.url)}>
                            <img src={video.thumbnail} alt={video.title} />
                            <h3>{video.title}</h3>
                        </div>
                    ))}
                </div>
                <hr />
            </section>

            <section className="glossary">
                <h2>Glossary of Financial Terms</h2>
                <div className="glossary-grid">
                    {glossaryTerms.map((term, index) => (
                        <div className="glossary-card" key={index}>
                            <div className="glossary-icon">{term.icon}</div>
                            <strong>{term.term}</strong>
                            <p>{term.definition}</p>
                        </div>
                    ))}
                </div>
                <hr />
            </section>

            <section className="recommended-resources">
                <h2>Recommended Books</h2>
                <div className="book-list">
                    {recommendedBooks.map((book, index) => (
                        <div className="book-card" key={index}>
                            <img src={book.cover} alt={book.title} />
                            <h3>{book.title}</h3>
                            <p>by {book.author}</p>
                            <a href={book.downloadLink} className="download-button">Download</a>
                        </div>
                    ))}
                </div>
                <hr />
            </section>

            {/* Quiz Button */}
            <button onClick={openQuizModal} className="take-quiz-button">Take the Finance Quiz</button>

            {/* Modal for video playback */}
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                ariaHideApp={false} 
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)', // Center the modal
                        width: '800px',
                        height: '600px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }
                }}
            >
                <button onClick={closeModal}>Close</button>
                <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    controls={true} // Show video controls
                    playing={true} // Automatically play the video
                />
            </Modal>

            {/* Modal for Quiz */}
            <Modal 
                isOpen={quizModalIsOpen} 
                onRequestClose={closeQuizModal} 
                ariaHideApp={false} 
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)', // Center the modal
                        width: '600px',
                        height: '700px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }
                }}
            >
                <button className="submit-button" onClick={closeQuizModal}>Close</button>
                <Quiz /> {/* Render the Quiz component here */}
            </Modal>
        </div>
    );
};

export default EducationPage;
