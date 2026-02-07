import React from "react";
import { useParams } from "react-router-dom";
import '../styles/news.css'; // Internal styling

const newsDetails = {
    1: {
        title: "Top 5 Remote Jobs in 2024",
        content: `
            Remote jobs have revolutionized the traditional workplace by offering flexibility and global opportunities. In 2024, some of the hottest remote job roles include:
            1. *Software Developer*: Companies are seeking experts in Python, JavaScript, and cloud platforms.
            2. *Digital Marketer*: Skills like SEO, social media strategy, and content marketing are in high demand.
            3. *Data Analyst*: Proficiency in data visualization tools like Tableau and Power BI is crucial.
            4. *Graphic Designer*: Creativity paired with mastery in Adobe Suite tools makes designers highly sought-after.
            5. *Customer Support Specialist*: Remote help desks are growing, offering flexible shifts.

            Remote jobs also foster diversity by enabling cross-cultural teams. Platforms like Upwork and Turing are great places to explore these opportunities.
        `,
        image: "https://humanprogress.org/wp-content/uploads/2019/12/20-tech-advances1.jpg" // New image URL

    },
    2: {
        title: "Tech Skills You Need to Learn in 2024",
        content: `
            The tech industry evolves rapidly, and 2024 is no exception. To remain competitive, mastering the following skills is essential:
            - *Artificial Intelligence (AI) & Machine Learning (ML)*: Build models that power intelligent systems like chatbots and recommendation engines.
            - *Blockchain Development*: Beyond cryptocurrency, blockchain is being applied in supply chain, healthcare, and finance sectors.
            - *Cloud Computing*: Platforms like AWS, Azure, and Google Cloud are indispensable for modern development.
            - *Cybersecurity*: As cyber threats rise, expertise in ethical hacking and network security is critical.
            - *DevOps & Automation*: Streamlining development pipelines with CI/CD tools like Jenkins and Docker is now a standard.

            Upskilling platforms like Udemy and Coursera can provide certifications to boost your resume. Start with small projects to apply these skills in real-world scenarios.
        `,
        image: "https://study.com/cimages/videopreview/videopreview-full/u4izilpv7l.jpg" // Updated image URL // New image URL
    },
    3: {
        title: "Salary Trends for Software Engineers",
        content: `
            Software engineers continue to be among the highest-paid professionals in 2024. Key highlights include:
            - *Entry-level roles*: Salaries start at $60,000 annually but vary by location and specialization.
            - *Full-Stack Developers*: Average annual pay is around $110,000, with higher wages in tech hubs.
            - *AI Specialists*: With expertise in ML algorithms, salaries often exceed $150,000.
            - *Freelancers*: Hourly rates have risen, with top-tier developers earning over $100/hour.

            Geographic trends indicate that remote engineers can command competitive salaries while living in lower-cost regions. Negotiating based on in-demand skills can significantly impact earnings.
        `,
        image: "https://media.istockphoto.com/id/1140691167/photo/ai-concept.jpg?s=612x612&w=0&k=20&c=J_F-XzRRpLtYzuYegj0Ub12pyI6NuD18UHgJN5BlF2o=" // Updated image URL // New image URL
    },
    4: {
        title: "Job Market Insights for Fresh Graduates",
        content: `
            Fresh graduates in 2024 face a dynamic but challenging job market. Here are some insights:
            - *Networking*: Over 70% of hires come through referrals. Build your professional network on LinkedIn and through alumni associations.
            - *Internships*: Companies value real-world experience. Completing an internship can significantly boost your employability.
            - *Soft Skills*: Communication, teamwork, and adaptability are just as crucial as technical expertise.
            - *Startups vs. Corporations*: Startups offer rapid growth and multi-role exposure, while corporations provide stability and structured career paths.

            Remember, persistence is key. Tailor your resume for each application and practice mock interviews to enhance your confidence.
        `,
       image: "https://study.com/cimages/videopreview/videopreview-full/u4izilpv7l.jpg"
    }
};

const NewsDetailPage = () => {
    const { id } = useParams();
    const news = newsDetails[id];

    if (!news) {
        return (
            <div className="news-detail">
                <h2>News not found</h2>
                <p>The news you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="news-detail">
            <h1>{news.title}</h1>
            <img src={news.image} alt={news.title} className="news-image" />
            <p>{news.content}</p>
        </div>
    );
};

export default NewsDetailPage;