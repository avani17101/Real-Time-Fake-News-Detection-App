# %%
f1 = open("url.txt", "r")
url = f1.read()

# %%
def check(domain):
# Used to check if the given 'domain' argument is present in the database
    with open('scraping/sources.csv', 'r') as csv_data:
        fields = csv.reader(csv_data)
        # Reads the column titles in the field
        for row in fields:
            # Reads the value in each row, into a list for columns
            if domain == row[0]:
                # Compares with the 0th element in the list 'row', which are the domain URLs
                return row[1]
                # Return the 1st element, which is the justification for the site being in the list
    return 1
    #return True if the URL is not present in the database

# %%
import urllib.request
import urllib.error
import requests 
from urllib.parse import urlparse
# Import the urllib2 libraries necessary for operating with the URLs
from bs4 import BeautifulSoup
# Import BeautifulSoup4 library for parsing the HTML response
import csv
accepted_scheme = ['http://', 'https://', 'ftp']
# Create a list of accepted connection types

def getStrippedLink(link):
    # Used to generate a string with only the domain
    parse = urlparse(link)
    # Parse the given link as a URL
    stripped_link = parse[1]
    # Get the domain specific string from the list 'parse'
    if 'www.' in link or 'http://' in link or 'https://' in link:
        # Check for the given strings in the link and remove them 
        stripped_link = stripped_link.strip('https://').strip('http://').strip('www.')
    return stripped_link


def openURL(link):
    # Create a Request object for the given link, with a user-agent specified 
    web_link = urllib.request.Request(link, data=None, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        handle = urllib.request.urlopen(web_link)
        # Attempt to connect to the URL and store the HTML GET response in 'handle' variable
    except urllib.error.HTTPError:
        print("Page unavailable")
        exit()
    return handle


def fileTitleWrite(soup, link):
    # Write the domain and title to the 'title.txt' file
    fo = open("title.txt", "w")
    fo.write(link + "\n")
    fo.write(soup.title.text)
    fo.close()


def fileLinkWrite(soup, parse):
    # Write the hyperlinked URLs to the 'links.txt' file
    fo = open("links.txt", "w")
    for link in soup.findAll('a'):
        # Find all the 'a' tags
        if 0 <= str(link.get('href')).find(str(parse[1])):
            # Find the tags with 'href' and which do not match to given link's domain 
            continue
        else:
            for s in accepted_scheme:
                if 0 <= str(link.get('href')).find(s):
                    # If accepted connection type, write the hyperlink to the file
                    fo.write(str(link.get('href')) + "\n")
    fo.close()
    
def fileBodyWrite(soup, link):
    # Write the domain and title to the 'title.txt' file
    fo = open("small_body.txt", "w")
    fo.write(link + "\n")
    fo.write(soup.body.text)
    fo.close()

def writeBody(soup,link):
    r = requests.get(link) 

    soup = BeautifulSoup(r.content, 'html5lib') 
    print(soup.prettify()) 
    #kill all script and style elements
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
    #print(text)
    f = open("article.txt", "a")
    f.write(text)
    f.close()
def starter(link):
    # Runs the entire script
    stripped_link = getStrippedLink(link)
    page = openURL(link)
    res = page.read()
    #Parse the pase into res
    soup = BeautifulSoup(res, "html.parser")
    #Use BeautifulSoup to create a nested data structure out of the HTML file of the website
    fileTitleWrite(soup, stripped_link)
    fileLinkWrite(soup, urlparse(link))
    writeBody(soup,link)
    fileBodyWrite(soup, link)

# %%
starter(url)

# %%

def checkDomain():
    # Check the URL of the given website, by invoking the check function in the Compare script
    fo = open('title.txt')
    link = fo.readline().rstrip("\n")
    fo.close()
    # Reading from the 'title.txt' file for the link of the site
    ret = check(link)
    # Store the return value of the check function in the Compare script
    if ret==1:
        return True
    else:
        check(link)
        # Set the reasons variable (which is tkinter StringVar() type) to the justification
        return False


def checkLinks():
    # Check the domain of all the hyperlinks in the given URL
    fo = open('links.txt')
    for line in fo:
        # Call the getStrippedLink function in the Scrape script, to get only the domain of the hyperlinked URL 
        link = getStrippedLink(line)
        if not check(link):
            return False
    return True


def result(link):
    # Main function for invoking all the respective scripts
    link = str(link)
    starter(link)
    # Call the starter function in the Scrape script, which runs the Scrape script compeletely
    results = ""
    # Set the 'results' variable as global, so that it does not the shadow the already defined 'results' variable
    if checkDomain():
        if checkLinks():
            results = "This site is not a fake news site"
            # If the response is True, none of the hyperlinked URLs are present in the database
        else:
            results = "This site has sources from a fake site"
            # If the response is False, one or more hyperlinked URLs are present in the database
    else:
        results ="This site is a fake news site"
    print(results)


# %%
result(url)