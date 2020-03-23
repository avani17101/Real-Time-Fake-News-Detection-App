#Automatic extraction of text from a webpage link
import requests 
from bs4 import BeautifulSoup 
f1 = open("url.txt", "r")
URL = f1.read()
  
# print(URL)
r = requests.get(URL) 
  
soup = BeautifulSoup(r.content, 'html5lib') 
print(soup.prettify()) 
# kill all script and style elements
for script in soup(["script", "style"]):
    script.extract()    # rip it out

# get text
text = soup.get_text()

# break into lines and remove leading and trailing space on each
lines = (line.strip() for line in text.splitlines())
# break multi-headlines into a line each
chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
# drop blank lines
text = '\n'.join(chunk for chunk in chunks if chunk)
f = open("article.txt", "a")
f.write(text)
f.close()
