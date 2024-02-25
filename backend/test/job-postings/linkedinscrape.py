from selenium import webdriver
import time
import pandas as pd
import os

from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

url1='https://www.linkedin.com/jobs/search?keywords=Marketing%20Data%20Analyst&location=Berlin%2C%20Berlin%2C%20Germany&geoId=106967730&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0' # replace with keyword and location

#Load the web driver and get the url

driver = webdriver.Chrome(executable_path='/Users/yashgupta/Desktop/Programming/HackIllinois2024/job-postings/chromedriver')
driver.implicitly_wait(10)
driver.get(url1)

# number of jobs
num_jobs = driver.find_elements(By.CLASS_NAME, 'results-context-header__job-count')[0].text

#Loop to scroll through all jobs and click on see more jobs button for infinite scrolling
i = 2
while i <= int((n+200)/25)+1: 
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    i = i + 1
    
    try:
        send=driver.find_element(By.XPATH, "//button[@aria-label='Load more results']")
        driver.execute_script("arguments[0].click();", send)   
        time.sleep(3)

    except:
        pass
        time.sleep(5)

#Create empty lists for company name and job title

companyname= []
titlename= []

#Find company name and append it to the blank list

try:
    for i in range(n):
        company=driver.find_elements(By.CLASS_NAME, 'base-search-card__subtitle')[i].text
        companyname.append(company)  
except IndexError:
    print("no")

#Find title name and append it to the blank list

try:
    for i in range(n):
        title=driver.find_elements_by_class_name('base-search-card__title')[i].text
        titlename.append(title)
        
except IndexError:
    print("no")
        
    
#Create dataframe for company name and title

companyfinal=pd.DataFrame(companyname,columns=["company"])
titlefinal=pd.DataFrame(titlename,columns=["title"])

#Join the two lists

x=companyfinal.join(titlefinal)

x.to_csv('linkedin.csv')
