# Scrapshut Project
Work for Scrapshut which was part of Design and Analysis of Software Systems Course at IIIT Hyderabad.

Client : Mounikesh Thadda, Founder of [Scrapshut](https://scrapshut.com/) <br>
Mentor TA : Mohit Chandra <br>


## Brief Problem Statement:
To develop a web platform for ScrapShut where users can come and rate
different URLs and get reviews of other users on a particular URL. This
web app aims to provide users with data on the credibility of the content
provided by various websites, to curb fake news perpetration.

## Project Overview:
We predict the genuineness of a website based on the majority of user
ratings, and ML model trained using features like website’s scraped data,
user's ratings/ reviews data from the website. Users further would be
asked to tell which portions of the article made them think the article is
fake and provide basis for their report . We aim to provide users with data
on which websites are genuine and not genuine and protect the users
malicious websites and fraud.

## Development Environment
* Editor - VS Code
* Web framework - Django 3
* Collaboration tools - Gitlab
* Frontend - Angular.js
* Documentation - Google Docs
* Database – AWS, Heroku
* Machine Learning - Keras, Tensorflow, Scipy
* Web Scraping - BeautifulSoup
* Language: Python○ Framework: Jupyter Notebook

## Features Implemented:
* Responsive WebApp 
  * User login- Signup
  * Homepage
  * Dashboard 
  * User Review form
  * Check URL verification
* Scraping
  * Title, body and all associated links on that page scraped and stored.
* ML model: for classification and prediction whether news is real/fake
 * LSTM
 * Passive Aggressive Classifier
 * CNN
* Real time Classification
  * Prediction based on combination of User reviews for that URL and ML models predictions

 
