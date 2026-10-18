# Alisha Rao — Webtoon Portfolio

**Live site:** https://alisharao18.github.io

A responsive, single-page portfolio told as a dark, vertical-scroll webtoon. Each section is a "chapter", with comic panels, speech bubbles, sound-effect text and a hidden bonus chapter.

Built with plain HTML, CSS and JavaScript. GSAP and ScrollTrigger are loaded from cdnjs. There is no build step and no package installation.

## About me

I am a fifth-year B.Tech Data Science (Integrated) student at NMIMS MPSTME, Mumbai. I work with Python, SQL, machine learning and statistics, and I like turning messy data into dashboards and models people can actually use.

## Features

- Webtoon-style vertical scroll with chapter headings, halftone textures and comic panels
- Animated hero with the name assembling letter by letter and floating cutout icons
- Scroll progress indicator with a "Page 01 / 11" counter
- Dark and light themes with a toggle
- Animated CGPA counter and a grouped skills section
- Project chapters generated from a data array in `js/main.js`
- Flip cards for interests (badminton, movies and series, manhwa, food, travel)
- Custom cursor and click effects
- Hidden bonus chapter: solve the anagram puzzle to unlock a short meme-style manga
- Responsive layout, keyboard-accessible controls and reduced-motion support

## Projects

1. **SEBI Mutual Fund Complaint Analytics Dashboard** (Selenium, PostgreSQL, Power BI, DAX): an end-to-end analytics pipeline and interactive dashboards for SEBI mutual fund complaint data.
2. **Customer Behaviour Modelling via Markov Chains** (Python, Monte Carlo, sensitivity analysis): a 4-state Markov Chain model of Spotify listening behaviour and drop-off states.
3. **Automated Portfolio Rebalancing & Tax Harvesting** (Python, Streamlit, backtesting): an ongoing rule-based robo-advisor with drawdown-aware rebalancing.
4. **Where'd All My Money Go?** (Python, Pandas, Statsmodels, Streamlit): statistical analysis of survey data using hypothesis testing, ANOVA, MANOVA and linear regression, packaged as a live Streamlit app: https://ssdiproject-3usqzjl8573g96rlh6ye6r.streamlit.app/

## Skills

- **Programming:** Python, SQL, Java, PostgreSQL
- **Libraries and frameworks:** Pandas, NumPy, Scikit-learn, Statsmodels
- **Machine learning and statistics:** Linear, Logistic, Ridge and Lasso Regression, K-Means, KNN, PCA, LDA, Hypothesis Testing, ANOVA, MANOVA, Markov Chains
- **Data analytics:** Data Cleaning, EDA, Feature Engineering, Statistical Modeling
- **Visualization and BI:** Power BI, Tableau, Streamlit, DAX

## Project structure

- `index.html` — page structure
- `css/style.css` — styles and both themes
- `js/main.js` — animations, project and skill data, theme toggle, bonus chapter
- `assets/` — portrait and hero cutout images

## Run locally

Open `index.html` in a browser, or serve the folder with any static HTTP server.

## Deploy to GitHub Pages

Push the contents of this folder to a GitHub repository, then open Settings → Pages. Choose "Deploy from a branch", select the `main` branch and the `/ (root)` folder, and save. The site uses relative paths, so it works as static hosting. File names are case sensitive on GitHub Pages.

## Contact

- Email: alisha.s.rao@gmail.com
- GitHub: https://github.com/alisharao18

## License

Code is free to read and learn from. Please do not copy the design or content as your own portfolio.
